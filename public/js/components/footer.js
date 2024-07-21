// Define the Footer component
const Footer = async (props) => {
    const { state, backgroundColor, textColor, size, alignment, id, content } = props;
  
    // Define size classes
    const sizeClasses = {
      small: 'footer-small',
      medium: 'footer-medium',
      large: 'footer-large'
    };
  
    // Define alignment classes
    const alignmentClasses = {
      left: 'footer-left',
      center: 'footer-center',
      right: 'footer-right'
    };
  
    // Apply styles and classes
    const style = `
      background-color: ${backgroundColor ?? '#333'};
      color: ${textColor ?? '#fff'};
    `;
  
    const className = `${sizeClasses[size] || sizeClasses.medium} ${alignmentClasses[alignment] || alignmentClasses.center}`;
  
    // Return virtual DOM representation of the footer
    return VDOM.createElement('footer', { 
      id,
      style,
      className
    }, content);
  };
  
  // Attach Footer to the global scope
  window.Footer = Footer;
  