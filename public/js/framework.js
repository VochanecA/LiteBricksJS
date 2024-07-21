// Virtual DOM class
class VDOM {
  // Creates a virtual DOM node with specified type, properties, and children
  static createElement(type, props = {}, ...children) {
    return { type, props, children: children.flat() };
  }

  // Converts a virtual DOM node into a real DOM node
  static render(vnode) {
    if (vnode == null) return document.createTextNode('');
    if (typeof vnode === 'string' || typeof vnode === 'number') return document.createTextNode(vnode);
    if (typeof vnode === 'boolean') return document.createTextNode(vnode ? 'true' : 'false');

    if (Array.isArray(vnode)) {
      const fragment = document.createDocumentFragment();
      vnode.forEach(child => fragment.appendChild(VDOM.render(child)));
      return fragment;
    }

    if (typeof vnode === 'object') {
      const element = document.createElement(vnode.type);
      Object.entries(vnode.props ?? {}).forEach(([key, value]) => {
        if (key.startsWith('on') && typeof value === 'function') {
          element.addEventListener(key.slice(2).toLowerCase(), value); // Event handling
        } else {
          element.setAttribute(key, value ?? ''); // Attribute setting
        }
      });
      (vnode.children ?? []).forEach(child => element.appendChild(VDOM.render(child))); // Render children
      return element;
    }

    console.error('Unsupported vnode type:', vnode);
    return document.createTextNode('');
  }

  // Compares two virtual DOM nodes to find differences
  static diff(oldNode, newNode) {
    if (!oldNode) return newNode;
    if (!newNode) return null;
    if (oldNode.type !== newNode.type) return newNode;
    if (typeof oldNode === 'string' && typeof newNode === 'string') {
      return oldNode !== newNode ? newNode : oldNode;
    }

    const patchedNode = { ...oldNode, props: { ...oldNode.props }, children: [] };
    const maxLength = Math.max(oldNode.children.length, newNode.children.length);
    for (let i = 0; i < maxLength; i++) {
      patchedNode.children.push(VDOM.diff(oldNode.children[i], newNode.children[i])); // Diff children
    }
    return patchedNode;
  }

  // Applies the differences between old and new virtual DOM nodes to the actual DOM
  static patch(parent, oldNode, newNode, index = 0) {
    if (!oldNode) {
      parent.appendChild(VDOM.render(newNode)); // Add new node
    } else if (!newNode) {
      parent.removeChild(parent.childNodes[index]); // Remove old node
    } else if (VDOM.diff(oldNode, newNode) !== oldNode) {
      parent.replaceChild(VDOM.render(newNode), parent.childNodes[index]); // Replace node
    } else if (typeof newNode !== 'string') {
      newNode.children.forEach((_, i) => {
        VDOM.patch(parent.childNodes[index], oldNode.children[i], newNode.children[i], i); // Patch children
      });
    }
  }

  // Cleans up event listeners and other resources associated with a virtual DOM node
  static cleanup(node) {
    if (typeof node === 'object' && node.props) {
      Object.entries(node.props ?? {}).forEach(([key, value]) => {
        if (key.startsWith('on') && typeof value === 'function') {
          node.removeEventListener(key.slice(2).toLowerCase(), value); // Remove event listeners
        }
      });
    }
    (node.children ?? []).forEach(VDOM.cleanup); // Cleanup children
  }
}

// Framework class
class Framework {
  // State management for components
  static state = {}; // Holds state for different components keyed by target element selector

  // Lifecycle hooks for components
  static lifecycleHooks = {
    componentDidMount: [], // Hooks to be called after a component is mounted
    componentDidUpdate: [], // Hooks to be called after a component is updated
  };

  // Renders a component into a specified target element
  static async render(component, props, target) {
    const root = document.querySelector(target); // Select target element
    if (!root) {
      console.error(`Target element not found: ${target}`);
      return;
    }

    try {
      // Initialize state for the component
      const componentState = Framework.state[target] ?? {};
      Framework.state[target] = componentState; // Update state reference

      // Get virtual DOM from the component
      const vdom = await component({ ...props, state: componentState });

      if (typeof vdom === 'string') {
        root.innerHTML = vdom; // Handle string output
      } else {
        if (!root.vdom) {
          const realDom = VDOM.render(vdom); // Initial render
          if (realDom instanceof Node) {
            root.appendChild(realDom);
            root.vdom = vdom;
            // Execute componentDidMount lifecycle hook
            Framework.lifecycleHooks.componentDidMount.forEach(fn => fn());
          } else {
            console.error('Rendered result is not a valid DOM node:', realDom);
          }
        } else {
          const newVDOM = await component({ ...props, state: componentState }); // Update render
          VDOM.patch(root, root.vdom, newVDOM);
          root.vdom = newVDOM;
          // Execute componentDidUpdate lifecycle hook
          Framework.lifecycleHooks.componentDidUpdate.forEach(fn => fn());
        }
      }
    } catch (error) {
      console.error('Error rendering component:', error); // Enhanced error handling
      // Provide fallback
      root.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    }
  }

  // Adds a lifecycle hook
  static addLifecycleHook(hookName, fn) {
    if (Framework.lifecycleHooks[hookName]) {
      Framework.lifecycleHooks[hookName].push(fn); // Register lifecycle hooks
    } else {
      console.error(`Lifecycle hook "${hookName}" does not exist.`);
    }
  }
}