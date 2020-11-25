import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './styles.css';
import { FiUpload } from 'react-icons/fi';

interface Props {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
    const [selectedFile, setSelectedFile] = useState('')
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const fileURL = URL.createObjectURL(file);
        setSelectedFile(fileURL);
        onFileUploaded(file);

    }, [onFileUploaded])
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    })

    return (
        <div className='dropzone' {...getRootProps()}>
            <input {...getInputProps()} accept='image/*' />
            {selectedFile ?
                <img src={selectedFile} alt='avatar' />
                : (
                    <p>
                        <FiUpload />
                 Arraste ou clique para adicionar uma imagem.
                    </p>

                )
            }
        </div>
    )
}

export default Dropzone;