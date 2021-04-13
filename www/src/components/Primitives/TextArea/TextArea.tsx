import React, {useMemo} from 'react';
import './TextArea.css';

interface Props {
    value?       : string;
    label        : string;
    onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}

const defaultProps: Props = {
    label: '',
    value: '',
    onChange: () => {}
}

export default function TextArea(props: Props) {
    const {label, value, onChange} = props;
    const area_id: string = useMemo(() => getRandomId(label), [label]);

    function getRandomId(label: string): string {
        return 'TextArea-' + label.length + Math.floor(Math.random() * 100);
    }

    return (
        <div className={'Primitives-TextArea__container'}>
            <label className={'Primitives-TextArea__label'} htmlFor={area_id}>
                {label}
            </label>
            <textarea id={area_id} className={'Primitives-TextArea'} onChange={onChange} value={value}/>
        </div>
    )
}

TextArea.defaultProps = defaultProps;