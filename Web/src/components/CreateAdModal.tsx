
import { CaretCircleDown, Check, GameController } from "phosphor-react";

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { Input } from "./Form/input";
import { Button } from "./Form/button";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";


interface Game {
    id: string;
    title: string;
}


export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    useEffect(() => {
        axios('http://localhost:3333/games')
            .then(response => {
                setGames(response.data)
            })
    }, [])
    async function handleCreateAd(event: FormEvent) {
        // previne comportamento padrão de redirecionar o user
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        // console.log(data)
        // console.log(weekDays)
        // console.log(useVoiceChannel)
        if(!data.name) return;
        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
            name: data.name,
            yearsPlaying: Number(data.yearsPlaying),
            discord: data.discord,
            weekDays: weekDays.map(Number),
            hourStart: data.hourStart,
            hourEnd: data.hourEnd,
            useVoiceChannel: useVoiceChannel
        })
        alert('Anúncio criado com sucesso!')
        } catch (err) {
            alert('Erro ao criar o anúncio.')
            console.log(err)
        }

    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/50 inset-0 fixed" />

            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-2xl shadow-black/25">
                <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
                <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="game" className="font-semibold">Qual o game?</label>
                        <Select.Root name="game">
                            <Select.Trigger className="flex justify-between">
                                <Select.Value className="w-full" />
                                <Select.Icon>
                                    <CaretCircleDown size={24} />
                                </Select.Icon>
                            </Select.Trigger>
                            <Select.Content id="game" className="h-auto bg-zinc-900 py-3 px-3 rounded-xl text-sm placeholder:text-zinc-500" defaultValue="">
                                {games.map(game => {
                                    return (
                                        <Select.Item
                                            key={game.id}
                                            value={game.id}
                                            className="w-full h-8 px-2 py-2 text-sm cursor-pointer mb-6 hover:bg-zinc-700 hover:rounded"
                                        >
                                            <Select.ItemText>{game.title}</Select.ItemText>

                                        </Select.Item>
                                    )
                                })}
                            </Select.Content>
                        </Select.Root>
                    </div>
                    <hr className="mt-1" />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input
                            name="name" id="name"
                            type="text"
                            placeholder="Como te chamam dentro do game?" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                            <Input
                                name="yearsPlaying" id="yearsPlaying"
                                type="number"
                                placeholder="Tudo bem ser ZERO" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord">Qual seu discord?</label>
                            <Input
                                name="discord" id="discord"
                                type="text"
                                placeholder="Usuario#0000" />
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekDays" className="text-xs font-semibold">Quando costuma jogar?</label>
                            <div className="flex gap-1">
                                <ToggleGroup.Root
                                    type="multiple" onValueChange={setWeekDays}
                                    value={weekDays}>
                                    <Button weekdays={weekDays} value="0" title="Domingo" label="D" />
                                    <Button weekdays={weekDays} value="1" title="Segunda" label="S" />
                                    <Button weekdays={weekDays} value="2" title="Terça" label="T" />
                                    <Button weekdays={weekDays} value="3" title="Quarta" label="Q" />
                                    <Button weekdays={weekDays} value="4" title="Quinta" label="Q" />
                                    <Button weekdays={weekDays} value="5" title="Sexta" label="S" />
                                    <Button weekdays={weekDays} value="6" title="Sábado" label="S" />
                                </ToggleGroup.Root>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="hourStart">Qual horário do dia?</label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input name="hourStart" id="hourStart" type="time" placeholder="De" className="none" />
                                <Input name="hourEnd" id="hourEnd" type="time" placeholder="Ate" />
                            </div>
                        </div>
                    </div>
                    <label className="mt-2 flex items-center gap-2 text-sm">
                        <Checkbox.Root 
                        checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if(checked === true) {
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)
                                }
                            }}
                            className="w-6 h-6 p-1 rounded bg-zinc-900">
                            <Checkbox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz.
                    </label>

                    <footer className="mt-4 flex justify-end gap-4">
                        <Dialog.Close
                            className="bg-zinc-500 px-5 h-12 rounded-md font-semibold  hover:bg-zinc-600">
                            Cancelar
                        </Dialog.Close>

                        <button
                            className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                            type="submit">
                            <GameController className="w-6 h-6" />
                            Encontrar Duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}