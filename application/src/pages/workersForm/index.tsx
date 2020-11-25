import React, { useState, ReactElement, FormEvent } from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import './styles.css';
import { useHistory } from 'react-router-dom';
import Dropzone from '../../components/Dropzone';
import api from '../../services/api';



function WorkersForm(): ReactElement {
    const history = useHistory();

    const [selectedFile, setSelectedFile] = useState<File>()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [bio, setBio] = useState('');
    const [cpf, setCPF] = useState('');

    const [category, setCategory] = useState('');
    const [speciallity, setSpeciallity] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { day: 0, from: '', to: '' },
    ]);

    function addNewScheduleItem() {
        setScheduleItems([...scheduleItems,
        { day: 0, from: '', to: '' },
        ]);
    }

    function handleCreateService(e: FormEvent) {
        e.preventDefault();

        api.post('services', {
            name,
            avatar: selectedFile,
            cpf,
            email,
            cellphone,
            bio,
            category,
            speciallity,
            schedule: scheduleItems,
        }).then(() => {
            alert('Cadastro realizado com sucesso!');
            history.push('/')
        }).catch(() => {
            alert('Erro no cadastro. Tente novamente.');
        })

        console.log(selectedFile)
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem;
        });
        setScheduleItems(updatedScheduleItems);
    }

    return (
        <div id="page-worker-form" className="container">
            <PageHeader
                title="Consiga mais clientes usando Marido de Aluguel." />

            <main>
                <form onSubmit={handleCreateService}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            name="name"
                            label="Nome Completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <Input
                            name="cpf"
                            label="CPF"
                            value={cpf}
                            onChange={(e) => { setCPF(e.target.value) }}
                        />

                        <Input
                            name="email"
                            label="E-mail"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />

                        <Input
                            name="cellphone"
                            label="Celular"
                            value={cellphone}
                            onChange={(e) => { setCellphone(e.target.value) }}
                        />
                        <Textarea
                            name="bio"
                            label="Fale mais sobre você"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Adicione uma foto sua</legend>
                        <Dropzone onFileUploaded={setSelectedFile} />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre seu serviço</legend>
                        <Select name="category"
                            label="Categoria"
                            value={category}
                            onChange={(e) => { setCategory(e.target.value) }}
                            options={[
                                { value: 'Eletricista', label: 'Eletricista' },
                                { value: 'Pintor', label: 'Pintor' },
                                { value: 'Montador de móveis', label: 'Montador de móveis' },
                                { value: 'Chaveiro', label: 'Chaveiro' },
                                { value: 'Encanador', label: 'Encanador' },
                                { value: 'Vidraceiro', label: 'Vidraceiro' },
                                { value: 'Marceneiro', label: 'Marceneiro' }
                            ]} />
                        <Input
                            name="speciallity"
                            label="Especialidade"
                            value={speciallity}
                            onChange={(e) => { setSpeciallity(e.target.value) }} />

                    </fieldset>
                    <fieldset>
                        <legend>Horários disponíveis
                    <button type="button" onClick={addNewScheduleItem}>
                                + novo horário </button>
                        </legend>
                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.day} className="schedule-item">
                                    <Select name="day"
                                        label="Dia da semana"
                                        value={scheduleItem.day}
                                        onChange={e => setScheduleItemValue(index, 'day', e.target.value)}
                                        options={[
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' },
                                            { value: '0', label: 'Domingo' }
                                        ]} />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)} />

                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)} />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            ** Importante! <br />
                         Preencha todos os dados.
                    </p>

                        <button type="submit">
                            Salvar cadastro
                    </button>
                    </footer>
                </form>
            </main>
        </div >
    )
}

export default WorkersForm;