CREATE DATABASE bibliofile;
USE bibliofile;


CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(100) NOT NULL,
  livros_lidos INT DEFAULT 0,
  media_notas DECIMAL(3,1) DEFAULT 0.0
);

INSERT INTO usuarios (nome, livros_lidos, media_notas,email, senha)
VALUES ('Oliver Juan',  47, 4.2 ,'oliver@email.com', '12345');


CREATE TABLE leituras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255),
    genero VARCHAR(100),
    paginas INT,
    tempo_leitura INT,  
    nota DECIMAL(2,1) CHECK (nota >= 0 AND nota <= 5),
    resenha TEXT,
    capa_livro VARCHAR(255),
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);


CREATE TABLE generos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL
);


INSERT INTO generos (nome) VALUES
('Fantasia'),
('Romance'),
('Ficção Científica'),
('Terror');

INSERT INTO leituras (usuario_id, titulo, autor, genero, paginas, tempo_leitura, nota, resenha, capa_livro)
VALUES
(1, 'Dom Casmurro', 'Machado de Assis', 'Romance', 256, 10, 4.8, 'Um clássico sobre ciúmes e lembranças.', 'https://covers.openlibrary.org/b/id/8225631-L.jpg'),
(1, 'A Menina que Roubava Livros', 'Markus Zusak', 'Drama', 480, 15, 4.9, 'Uma narrativa emocionante narrada pela Morte.', 'https://covers.openlibrary.org/b/id/8778585-L.jpg'),
(1, 'O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Fábula', 96, 4, 4.7, 'Lições sobre amizade e amor em formato poético.', 'https://covers.openlibrary.org/b/id/7884861-L.jpg'),
(1, '1984', 'George Orwell', 'Ficção Científica', 328, 12, 4.9, 'Uma distopia sobre vigilância e totalitarismo.', 'https://covers.openlibrary.org/b/id/7222246-L.jpg'),
(1, 'Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 'Fantasia', 309, 11, 4.6, 'O início da saga mágica de Hogwarts.', 'https://covers.openlibrary.org/b/id/7884862-L.jpg'),
(1, 'A Culpa é das Estrelas', 'John Green', 'Romance', 288, 9, 4.5, 'Um amor jovem e trágico que marca para sempre.', 'https://covers.openlibrary.org/b/id/7884863-L.jpg'),
(1, 'O Hobbit', 'J.R.R. Tolkien', 'Aventura', 310, 10, 4.8, 'A jornada inesperada de Bilbo Bolseiro.', 'https://covers.openlibrary.org/b/id/6979861-L.jpg'),
(1, 'It: A Coisa', 'Stephen King', 'Terror', 1100, 40, 4.4, 'Uma história sobre o medo e a infância perdida.', 'https://covers.openlibrary.org/b/id/7222247-L.jpg'),
(1, 'Percy Jackson e o Ladrão de Raios', 'Rick Riordan', 'Fantasia', 400, 13, 4.5, 'Mitologia grega e aventuras modernas.', 'https://covers.openlibrary.org/b/id/8225632-L.jpg'),
(1, 'O Código Da Vinci', 'Dan Brown', 'Suspense', 455, 14, 4.6, 'Mistérios e segredos na arte e religião.', 'https://covers.openlibrary.org/b/id/8272146-L.jpg'),
(1, 'Coraline', 'Neil Gaiman', 'Fantasia Sombria', 192, 6, 4.3, 'Uma menina descobre um mundo paralelo assustador.', 'https://covers.openlibrary.org/b/id/7884864-L.jpg'),
(1, 'A Revolução dos Bichos', 'George Orwell', 'Sátira', 152, 5, 4.7, 'Uma crítica ao autoritarismo e corrupção.', 'https://covers.openlibrary.org/b/id/8225633-L.jpg'),
(1, 'O Senhor dos Anéis: A Sociedade do Anel', 'J.R.R. Tolkien', 'Fantasia', 576, 22, 5.0, 'O início da épica jornada pela Terra Média.', 'https://covers.openlibrary.org/b/id/6979862-L.jpg');
