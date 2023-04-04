import styled from "styled-components";

interface Props {
    label?: string;
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
};

const Rotulo = styled.label`
display: block;
font-weight: 700;
font-size: 16px;
line-height: 19px;
color: var(--azul-escuro)
`

const Campo = styled.input`
background: #F8F8F8;
margin: 1em 0;
box-sizing: border-box;
box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
border-radius: 8px;
border: none;
width: 100%;
padding: 16px;
    ::placeholder {
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
}
`

const Container = styled.div`
width: 100%;
`


export default function CampoDigitacao({ label, value, placeholder, onChange }: Props) {
    return (
        <Container>
            <Rotulo>{label}</Rotulo>
            <Campo type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </Container>
    );
}