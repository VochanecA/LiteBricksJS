// Define the Dropdown component
const Dropdown = async (props) => {
    const { state, options, backgroundColor, textColor, size, id, width, margin, borderColor } = props; // Access props

    // Define size classes
    const sizeClasses = {
        small: 'dropdown-small',
        medium: 'dropdown-medium',
        large: 'dropdown-large'
    };

    // Handle option change
    const handleChange = (event) => {
        state.selected = event.target.value;
    };

    // Create dropdown options
    const dropdownOptions = options.map(option => 
        VDOM.createElement('option', { value: option }, option)
    );

    // Apply styles and classes
    const style = `
        background-color: ${backgroundColor ?? '#fff'};
        color: ${textColor ?? '#000'};
        width: ${width ?? '100%'};
        margin: ${margin ?? '0'};
        border: 1px solid ${borderColor ?? '#ccc'}; /* Border color */
        border-radius: 4px; /* Rounded corners */
        padding: 8px; /* Padding for dropdown */
        box-sizing: border-box; /* Ensure padding and border are included in the element's total width and height */
    `;

    const className = sizeClasses[size] || sizeClasses.medium; // Default to medium size

    // Return virtual DOM representation of the dropdown
    return VDOM.createElement('select', { 
        id,
        onChange: handleChange, 
        value: state.selected ?? '', // Set selected value
        style,
        className: `dropdown ${className}` // Apply size class
    }, ...dropdownOptions);
};

// Attach Dropdown to the global scope
window.Dropdown = Dropdown;
