class VDOM {
    static createElement(type, props = {}, ...children) {
        return { type, props, children: children.flat() };
    }

    static render(vnode, parent) {
        if (typeof vnode === 'string') {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = vnode;
            return tempDiv.firstElementChild;
        }

        const element = document.createElement(vnode.type);

        for (const [key, value] of Object.entries(vnode.props)) {
            element.setAttribute(key, value);
        }

        vnode.children.map(child => VDOM.render(child)).forEach(child => element.appendChild(child));

        return element;
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
}

class Framework {
    static render(component, props, target) {
        const vdom = component(props);
        const root = document.querySelector(target);

        if (typeof vdom === 'string') {
            root.innerHTML = vdom;
        } else {
            if (!root.vdom) {
                root.appendChild(VDOM.render(vdom));
                root.vdom = vdom;
            } else {
                const newVDOM = component(props);
                VDOM.patch(root, root.vdom, newVDOM);
                root.vdom = newVDOM;
            }
        }
    }
}
