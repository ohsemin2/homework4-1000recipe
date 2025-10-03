import React, {
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import {
  Recipe,
  RecipesResponse,
} from "../types/Recipe";
import "./MainPage.css";

const MainPage: React.FC = () => {
  const [recipes, setRecipes] = useState<
    Recipe[]
  >([]);
  const [currentPage, setCurrentPage] =
    useState<number>(1);
  const [totalRecipes, setTotalRecipes] =
    useState<number>(0);
  const [loading, setLoading] =
    useState<boolean>(true);
  const recipesPerPage: number = 12;

  useEffect(() => {
    fetchRecipes(currentPage);
  }, [currentPage]);

  const fetchRecipes = async (
    page: number
  ): Promise<void> => {
    setLoading(true);
    try {
      const skip = (page - 1) * recipesPerPage;
      const response = await fetch(
        `https://dummyjson.com/recipes?limit=${recipesPerPage}&skip=${skip}`
      );
      const data: RecipesResponse =
        await response.json();
      setRecipes(data.recipes);
      setTotalRecipes(data.total);
    } catch (error) {
      console.error(
        "Error fetching recipes:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const totalPages: number = Math.ceil(
    totalRecipes / recipesPerPage
  );

  const handlePageChange = (
    page: number
  ): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePrevious = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    const maxVisiblePages: number = 10;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(
        1,
        currentPage - 4
      );
      const endPage = Math.min(
        totalPages,
        startPage + maxVisiblePages - 1
      );

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="loading">로딩 중...</div>
    );
  }

  return (
    <div className="main-page">
      <div className="container">
        <h1 className="title">천개의 레시피</h1>

        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <Link
              to={`/recipe/${recipe.id}`}
              key={recipe.id}
              className="recipe-card"
            >
              <div className="recipe-image">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                />
              </div>
              <div className="recipe-info">
                <h3 className="recipe-name">
                  {recipe.name}
                </h3>
                <p className="recipe-difficulty">
                  Easy
                </p>
                <div className="recipe-tags">
                  {recipe.ingredients
                    ?.slice(0, 3)
                    .map((ingredient, index) => (
                      <span key={index}>
                        {ingredient.length > 10
                          ? ingredient.slice(
                              0,
                              10
                            ) + "..."
                          : ingredient}
                      </span>
                    )) || [
                    <span key="1">재료 1</span>,
                    <span key="2">재료 2</span>,
                    <span key="3">재료 3</span>,
                  ]}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="pagination">
          <button
            className={`prev-next-button ${
              currentPage === 1 ? "disabled" : ""
            }`}
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            이전
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              className={`page-button ${
                currentPage === page
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handlePageChange(page)
              }
            >
              {page}
            </button>
          ))}
          <button
            className={`prev-next-button ${
              currentPage === totalPages
                ? "disabled"
                : ""
            }`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
