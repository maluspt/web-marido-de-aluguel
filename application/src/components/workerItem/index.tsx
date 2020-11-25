import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom'


export interface Worker {
    name: string;
    avatar: string;
    bio: string;
    category: string;
    email: string;
    cellphone: string;
    id: number;
    cpf: string;
    speciallity: string;
}

interface WorkerItemProps {
    worker: Worker;
}

const WorkerItem: React.FC<WorkerItemProps> = ({ worker }) => {
    return (
        <article className="worker-item">
            <header>
                <img src={worker.avatar} alt="avatar" />
                <div>
                    <strong>{worker.name}</strong>
                    <span>{worker.category}</span>
                </div>
            </header>
            <p>
                {worker.bio}
            </p>

            <footer>
                <p>
                    Rank de avaliação:
                            <strong>#{Math.floor(Math.random() * (500 - 1) + 1)}</strong>
                </p>
                <div className="buttons-container">
                    <Link to="/quote" className="quote">
                        Solicitar orçamento
                    </Link>
                </div>

            </footer>

        </article>
    );
}

export default WorkerItem;