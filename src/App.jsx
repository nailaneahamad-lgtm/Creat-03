
import { useState } from "react";
import BookCard from "./components/BookCard";
import "./App.css";

function App() {

  // Tableau des livres
  const [books, setBooks] = useState([
    {
      id: 1,
      titre: "Les Misérables",
      auteur: "Victor Hugo",
      estDisponible: true
    },
    {
      id: 2,
      titre: "L'Étranger",
      auteur: "Albert Camus",
      estDisponible: false
    },
    {
      id: 3,
      titre: "Le Petit Prince",
      auteur: "Antoine de Saint-Exupéry",
      estDisponible: true
    },
    {
      id: 4,
      titre: "Une si longue lettre",
      auteur: "Mariama Bâ",
      estDisponible: true
    }
  ]);

  // États du formulaire
  const [titre, setTitre] = useState("");
  const [auteur, setAuteur] = useState("");

  // Nombre de livres disponibles
  const nombreDisponibles = books.filter(
    (book) => book.estDisponible
  ).length;

  // Fonction pour emprunter ou rendre un livre
  const onClickEmprunt = (bookId) => {
    setBooks((anciensBooks) =>
      anciensBooks.map((book) =>
        book.id === bookId
          ? {
              ...book,
              estDisponible: !book.estDisponible
            }
          : book
      )
    );
  };

  // Fonction pour ajouter un livre
  const ajouterLivre = (e) => {
    e.preventDefault();

    if (titre.trim() === "" || auteur.trim() === "") {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const nouveauLivre = {
      id: Date.now(),
      titre: titre.trim(),
      auteur: auteur.trim(),
      estDisponible: true
    };

    setBooks((anciensBooks) => [
      ...anciensBooks,
      nouveauLivre
    ]);

    setTitre("");
    setAuteur("");
  };

  return (
    <div className="app-container">

      <h1>Bibliothèque universitaire</h1>

      <h3>
        Nombre de livres disponibles : {nombreDisponibles}
      </h3>

      <h2>Catalogue des livres</h2>

      <div className="books-grid">

        {books.map((book) => (
          <BookCard
            key={book.id}
            titre={book.titre}
            auteur={book.auteur}
            estDisponible={book.estDisponible}
            onClickEmprunt={() => onClickEmprunt(book.id)}
          />
        ))}

      </div>

      <div className="form-container">

        <h2>Ajouter un nouveau livre</h2>

        <form onSubmit={ajouterLivre}>

          <label>Titre du livre :</label>

          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Entrez le titre du livre"
          />

          <label>Auteur :</label>

          <input
            type="text"
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
            placeholder="Entrez le nom de l'auteur"
          />

          <button type="submit">
            Ajouter le livre
          </button>

        </form>

      </div>

    </div>
  );
}

export default App;
