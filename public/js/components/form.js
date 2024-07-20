function Form(props) {
    return `
        <form class="form" action="${props.action}" method="${props.method}">
            ${props.inputs.map(input => Input(input)).join('')}
            <button type="submit">${props.buttonText}</button>
        </form>
    `;
}
