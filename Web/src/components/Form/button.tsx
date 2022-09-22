/* queremos falar que este component do react poderá receber todas as propriedades
ou atributos que o elemento do html receberia... IdleDeadline, type, Placeholder....*/
import { InputHTMLAttributes } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

interface ButtonProps {
    title: string;
    label: string;
    value: string;
    weekdays: Array<string>;
}

export function Button(props: ButtonProps) {
    return (
        <ToggleGroup.Item
        {...props}
        className={`w-5 h-5 border-b-2 rounded-sm text-white font-extralight hover:bg-zinc-300 hover:text-black/80 text-sm ${props.weekdays.includes(props.value) ? 'bg-violet-500' : ''}`}
        >
            {props.label}
        </ToggleGroup.Item> 
    )
}