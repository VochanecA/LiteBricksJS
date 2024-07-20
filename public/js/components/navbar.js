function Navbar(props) {
    return `
        <nav class="navbar" style="
            background-color: ${props.backgroundColor || 'var(--navbar-bg-color, #333)'};
            color: ${props.textColor || 'var(--navbar-text-color, #fff)'};
        ">
            <div class="navbar-logo">
                ${props.logo ? `<img src="${props.logo}" alt="Logo" style="max-height: 40px;">` : props.title || 'Logo'}
            </div>
            <ul class="navbar-menu" style="order: ${props.menuPosition === 'right' ? 2 : 1};">
                ${props.menuItems.map(item => `<li><a href="${item.link}">${item.text}</a></li>`).join('')}
            </ul>
            <div class="navbar-auth" style="order: ${props.menuPosition === 'right' ? 1 : 2};">
                ${props.showLogin ? '<a href="/login">Login</a>' : ''}
                ${props.showLogout ? '<a href="/logout">Logout</a>' : ''}
                ${props.showSignup ? '<a href="/signup">Signup</a>' : ''}
            </div>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    `;
}