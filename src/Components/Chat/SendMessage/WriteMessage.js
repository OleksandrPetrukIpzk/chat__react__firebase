export const WriteMessage = ({text, setText}) => {

    const handleChange = (value) => {
        let lines = value.split('\n');
        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i].trimLeft();
        }
        const result = lines.join('\n');
        setText(result);
    }

    return (<input placeholder='Type your Message...' value={text} className='send__input'
                   onChange={(e) => handleChange(e.target.value)}/>)
}