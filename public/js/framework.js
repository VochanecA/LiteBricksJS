class VDOM {
    static createElement(type, props = {}, ...children) {
      return { type, props, children: children.flat() };
    }
  
    static render(vnode) {
      if (vnode == null) {
        return document.createTextNode('');
      }
      if (typeof vnode === 'string' || typeof vnode === 'number') {
        return document.createTextNode(vnode);
      }
      if (typeof vnode === 'boolean') {
        return document.createTextNode(vnode ? 'true' : 'false');
      }
      if (Array.isArray(vnode)) {
        const fragment = document.createDocumentFragment();
        vnode.forEach(child => fragment.appendChild(VDOM.render(child)));
        return fragment;
      }
      if (typeof vnode === 'object') {
        const element = document.createElement(vnode.type);
        for (const [key, value] of Object.entries(vnode.props)) {
          if (key.startsWith('on') && typeof value === 'function') {
            element.addEventListener(key.slice(2).toLowerCase(), value);
          } else {
            element.setAttribute(key, value);
          }
        }
        (vnode.children || []).forEach(child => element.appendChild(VDOM.render(child)));
        return element;
      }
      console.error('Unsupported vnode type:', vnode);
      return document.createTextNode('');
    }
  
    static diff(oldNode, newNode) {
      if (!oldNode) return newNode;
      if (!newNode) return null;
      if (oldNode.type !== newNode.type) return newNode;
      if (typeof oldNode === 'string' && typeof newNode === 'string') {
        if (oldNode !== newNode) return newNode;
        return oldNode;
      }
      const patchedNode = { ...oldNode, props: { ...oldNode.props }, children: [] };
      const childCount = Math.max(oldNode.children.length, newNode.children.length);
      for (let i = 0; i < childCount; i++) {
        patchedNode.children.push(VDOM.diff(oldNode.children[i], newNode.children[i]));
      }
      return patchedNode;
    }
  
    static patch(parent, oldNode, newNode, index = 0) {
      if (!oldNode) {
        parent.appendChild(VDOM.render(newNode));
      } else if (!newNode) {
        parent.removeChild(parent.childNodes[index]);
      } else if (VDOM.diff(oldNode, newNode) !== oldNode) {
        parent.replaceChild(VDOM.render(newNode), parent.childNodes[index]);
      } else if (typeof newNode !== 'string') {
        for (let i = 0; i < newNode.children.length; i++) {
          VDOM.patch(parent.childNodes[index], oldNode.children[i], newNode.children[i], i);
        }
      }
    }
  
    static cleanup(node) {
      if (typeof node === 'object' && node.props) {
        for (const [key, value] of Object.entries(node.props)) {
          if (key.startsWith('on') && typeof value === 'function') {
            node.removeEventListener(key.slice(2).toLowerCase(), value);
          }
        }
      }
      if (node.children) {
        node.children.forEach(VDOM.cleanup);
      }
    }
  }
  
  class Framework {
    static render(component, props, target) {
      const root = document.querySelector(target);
      if (!root) {
        console.error(`Target element not found: ${target}`);
        return;
      }
  
      try {
        const vdom = component(props);
        if (typeof vdom === 'string') {
          root.innerHTML = vdom;
        } else {
          if (!root.vdom) {
            const realDom = VDOM.render(vdom);
            if (realDom instanceof Node) {
              root.appendChild(realDom);
              root.vdom = vdom;
            } else {
              console.error('Rendered result is not a valid DOM node:', realDom);
            }
          } else {
            const newVDOM = component(props);
            VDOM.patch(root, root.vdom, newVDOM);
            root.vdom = newVDOM;
          }
        }
      } catch (error) {
        console.error('Error rendering component:', error);
      }
    }
  }