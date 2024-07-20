# LiteBricksJS - Minimalist Framework for learning purpose

**LiteBricksJS** is a minimalist and easy-to-use JavaScript front-end framework designed to simplify the process of building modern web applications. It offers a modular approach with a focus on ease of use and minimal overhead.

## Overview

**LiteBricksJS** provides a component-based architecture for creating interactive and responsive web components using a straightforward and declarative syntax. It aims to streamline the development process while ensuring that components are easy to manage and integrate.

## Key Features

- **Component-Based Architecture**: 
  Build reusable and customizable components. Each component is a self-contained unit that can be easily rendered and managed.

- **Declarative Syntax**: 
  Define components using a simple templating approach, allowing for easy customization and dynamic content insertion.

- **Responsive Design**: 
  Ensure that components adapt to various screen sizes, including desktop, laptop, and mobile devices.

- **Integration with ExpressJS**: 
  Designed to work seamlessly with ExpressJS for server-side rendering and static file serving.

- **Minimalist Design**: 
  Focus on core functionalities needed for modern web applications while avoiding unnecessary complexity.

## Components

- **Navbar**:
  A customizable navigation bar with properties for background color, text color, menu items, logo, and authentication controls.

- **Carousel**:
  An image slider component supporting image transitions with configurable intervals and navigation buttons.

- **Table**:
  A table component with configurations for column widths, responsive design, and styling options.

- **Form**:
  A flexible form component supporting various input types, labels, placeholders, and submit buttons.

- **Card**:
  A card component for displaying content, with options for headers, content areas, images, and styling.

## Framework Structure

### `framework.js`

The core of **LiteBricksJS**, `framework.js`, handles the rendering and updating of components. It provides functions to render components into specified HTML elements.

### Example

Here’s an example of how to use **LiteBricksJS**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LiteBricksJS Example</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <div id="app">
        <div id="navbar-container"></div>
        <div id="carousel-container"></div>
        <div id="table-container"></div>
        <div id="form-container"></div>
        <div id="card-container"></div>
    </div>

    <script src="/js/framework.js"></script>
    <script src="/js/components/navbar.js"></script>
    <script src="/js/components/carousel.js"></script>
    <script src="/js/components/table.js"></script>
    <script src="/js/components/input.js"></script>
    <script src="/js/components/form.js"></script>
    <script src="/js/components/cards.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            LiteBricksJS.render(Navbar, {
                backgroundColor: '#333',
                textColor: '#fff',
                menuPosition: 'right',
                menuItems: [
                    { text: 'Home', link: '/' },
                    { text: 'About', link: '/about' },
                    { text: 'Contact', link: '/contact' }
                ],
                logo: '',
                showLogin: true,
                showLogout: false,
                showSignup: true
            }, '#navbar-container');

            LiteBricksJS.render(Carousel, {
                images: [
                    '/images/1.jpeg',
                    '/images/2.jpeg',
                    '/images/3.jpeg'
                ],
                interval: 1500 // Change image every 1.5 seconds
            }, '#carousel-container');

            LiteBricksJS.render(Table, {
                headers: ['Name', 'Age', 'Email'],
                data: [
                    ['John Doe', 25, 'john@example.com'],
                    ['Jane Smith', 30, 'jane@example.com'],
                    ['Sam Brown', 20, 'sam@example.com']
                ]
            }, '#table-container');

            LiteBricksJS.render(Form, {
                action: '/submit',
                method: 'post',
                inputs: [
                    { id: 'name', label: 'Name', type: 'text', name: 'name', placeholder: 'Enter your name' },
                    { id: 'email', label: 'Email', type: 'email', name: 'email', placeholder: 'Enter your email' }
                ],
                buttonText: 'Submit'
            }, '#form-container');

            LiteBricksJS.render(Card, {
                header: 'Card Title',
                content: 'This is the card content.'
            }, '#card-container');
        });
    </script>
</body>
</html>
