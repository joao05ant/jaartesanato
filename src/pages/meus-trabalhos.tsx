import Head from "next/head";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import Image from "next/image";

// Interface para definir o tipo dos objetos retornados pela API do Google Drive
interface Trabalho {
  id: string;
  descricao: string;
  imagemSrc: string;
}

// Função para buscar arquivos da pasta do Google Drive
async function fetchImagesFromGoogleDrive(folderId: string, apiKey: string): Promise<Trabalho[]> {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,webContentLink)`);
  const data = await res.json();
  return data.files.map((file: { id: string; name: string; }) => ({
    id: file.id,
    descricao: file.name,
    imagemSrc: `https://drive.google.com/uc?export=view&id=${file.id}`
  }));
}

export default function MeusTrabalhos() {
  const [trabalhos, setTrabalhos] = useState<Trabalho[]>([]);
  const [searchTerm, setBuscaTrabalho] = useState<string>(""); // Inicialize com uma string vazia
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    const folderId = '1O3B1fdcI4rh-euFd0jN_NZqLhqmpTO8F'; //id da pasta
    const apiKey = 'AIzaSyCOvM2nXyPU9wFo77cnhTzGFBnDL98nW8Q'; //token da pasta
    fetchImagesFromGoogleDrive(folderId, apiKey).then(setTrabalhos);
  }, []);

  const openModal = (src: string) => {
    setSelectedImage(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage("");
    setModalOpen(false);
  };

  // Filtra os trabalhos com base no termo de pesquisa
  const filteredTrabalhos = trabalhos.filter(trabalho =>
    trabalho.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Meus Trabalhos - J.A Artsanato</title>
        <meta name="description" content="Conheça os trabalhos de J.A Artsanato" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container mx-auto p-4">
        <Header />

        <h1 className="font-bold text-4xl text-pink-500 mt-6 text-center">Meus trabalhos</h1>

        <p className="text-zinc-600 text-justify mt-4">
          Aqui você encontrará uma seleção dos meus trabalhos mais recentes e projetos de arte. Cada peça é criada com dedicação e paixão, refletindo a minha visão e estilo únicos.
        </p>

        <div className="mt-8 flex justify-center">
          <input
            type="text"
            placeholder="Buscar trabalho..."
            value={searchTerm}
            onChange={(e) => setBuscaTrabalho(e.target.value)}
            className="w-full max-w-sm p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTrabalhos.map((trabalho) => (
            <div key={trabalho.id} className="border border-gray-300 rounded overflow-hidden cursor-pointer" onClick={() => openModal(trabalho.imagemSrc)}>
              <Image
                src={trabalho.imagemSrc}
                alt={trabalho.descricao}
                layout="responsive" 
                width={300} 
                height={400} 
                objectFit="cover" // Ajuste da imagem para preencher o espaço
              />
              <div className="p-4">
                <p className="text-gray-700  text-center">{trabalho.descricao}</p>
              </div>
            </div>
          ))}
        </div>


        {modalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg relative">
              <button className="absolute top-2 right-2 text-gray-700" onClick={closeModal}>
                <Image src="/botao-x.png" alt="Fechar" width={45} height={45} />
              </button>
              <Image src={selectedImage} alt="Imagem ampliada" width={600} height={400} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}