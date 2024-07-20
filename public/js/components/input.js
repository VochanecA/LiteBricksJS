function Input(props) {
    return `
        <div class="input-group">
            <label for="${props.id}">${props.label}</label>
            <input type="${props.type}" id="${props.id}" name="${props.name}" placeholder="${props.placeholder}">
        </div>
    `;
}
