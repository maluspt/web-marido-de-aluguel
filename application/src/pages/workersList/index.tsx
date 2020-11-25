import React, { FormEvent, useState } from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import WorkerItem, { Worker } from '../../components/workerItem';
import Select from '../../components/Select';
import './styles.css';
import api from '../../services/api';



function WorkersList() {
    const [workers, setWorkers] = useState([]);
    const [category, setCategory] = useState('');
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('services', {
            params: {
                category,
                day,
                time,
            }
        });

        setWorkers(response.data);

    }

    return (
        <div id="page-worker-list" className="container">
            <PageHeader title="Encontre o prestador de serviço ideal para você.">
                <form id="search-workers" onSubmit={searchTeachers}>
                    <Select name="category"
                        label="Categoria"
                        value={category}
                        onChange={e => { setCategory(e.target.value) }}
                        options={[
                            { value: 'Eletricista', label: 'Eletricista' },
                            { value: 'Pintor', label: 'Pintor' },
                            { value: 'Montador de móveis', label: 'Montador de móveis' },
                            { value: 'Chaveiro', label: 'Chaveiro' },
                            { value: 'Encanador', label: 'Encanador' },
                            { value: 'Vidraceiro', label: 'Vidraceiro' },
                            { value: 'Marceneiro', label: 'Marceneiro' }
                        ]} />
                    <Select name="day"
                        label="Dia da semana"
                        value={day}
                        onChange={e => { setDay(e.target.value) }}
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
                        type="time"
                        name="time"
                        label="Horário"
                        value={time}
                        onChange={e => { setTime(e.target.value) }} />

                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {workers[0] ? (
                    workers.map((worker: Worker) => (
                        <WorkerItem key={worker.id} worker={worker} />
                    ))
                ) : (
                        <p>
                            Nenhum profissional encontrado com sua busca.
                        </p>
                    )}

            </main>
        </div >
    )
}

export default WorkersList;