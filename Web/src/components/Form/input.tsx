/* queremos falar que este component do react poderá receber todas as propriedades
ou atributos que o elemento do html receberia... IdleDeadline, type, Placeholder....*/
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {


    return (
        <input 
        {...props}
        className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
        />
    )
}