import React, { useState, ReactElement, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Dropzone from '../../components/Dropzone';
import './styles.css';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';


function QuoteForm() {
    const history = useHistory();
    const [selectedFile, setSelectedFile] = useState<File>()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    function handleCreateQuote(e: FormEvent) {
        e.preventDefault();

        api.post('quote', {
            name,
            cellphone,
            email,
            description,
            image: setSelectedFile
        }).then(() => {
            alert('Seu orçamento foi realizado com sucesso! Agora é só esperar nossos profissionais entrarem em contato com você.');
            history.push('/')
        }).catch(() => {
            alert('Erro ao solicitar orçamento. Tente novamente.');
        })
    }

    return (
        <div id="page-quote-form" className="container">
            <PageHeader
                title="Preencha o formulário para solicitar um orçamento. É rapidinho." />
            <main>
                <form onSubmit={handleCreateQuote}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} />
                        <Input
                            name="cellphone"
                            label="Telefone para contato"
                            value={cellphone}
                            onChange={(e) => { setCellphone(e.target.value) }} />
                        <Input
                            name="email"
                            label="E-mail para contato"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }} />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre o serviço</legend>
                        <Textarea
                            name="details"
                            label="Descreva melhor sobre o que precisa ser feito."
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }} />
                    </fieldset>
                    <fieldset>
                        <legend>Adicione uma foto sobre os serviço (se houver)</legend>
                        <Dropzone onFileUploaded={setSelectedFile} />
                    </fieldset>
                    <footer>
                        <p>
                            ** Importante! <br />
                         Preencha todos os dados.
                    </p>

                        <button type="submit">
                            Solicitar orçamento
                    </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default QuoteForm;