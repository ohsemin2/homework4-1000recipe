import React, {
  useState,
  useEffect,
} from "react";
import {
  useParams,
  Link,
} from "react-router-dom";
import { Recipe } from "../types/Recipe";
import "./DetailPage.css";

interface RouteParams
  extends Record<string, string | undefined> {
  id: string;
}

const DetailPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [recipe, setRecipe] =
    useState<Recipe | null>(null);
  const [loading, setLoading] =
    useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetchRecipe(id);
    }
  }, [id]);

  const fetchRecipe = async (
    recipeId: string
  ): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/recipes/${recipeId}`
      );
      const data: Recipe = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error(
        "Error fetching recipe:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">로딩 중...</div>
    );
  }

  if (!recipe) {
    return (
      <div className="error">
        레시피를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="container">
        <Link to="/" className="back-link">
          ← 목록으로
        </Link>

        <h1 className="title">천개의 레시피</h1>

        <div className="recipe-detail">
          <div className="recipe-image-container">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="recipe-image"
            />
            <div className="recipe-basic-info">
              <h2 className="recipe-title">
                {recipe.name}
              </h2>
              <p className="recipe-difficulty">
                {recipe.difficulty || "Easy"}
              </p>
              <div className="recipe-basic-details">
                <p>
                  준비시간:{" "}
                  {recipe.prepTimeMinutes}분
                </p>
                <p>
                  조리시간:{" "}
                  {recipe.cookTimeMinutes}분
                </p>
                <p>
                  총 시간:{" "}
                  {recipe.prepTimeMinutes +
                    recipe.cookTimeMinutes}
                  분
                </p>
              </div>
            </div>
          </div>

          <div className="recipe-content">
            <div className="section">
              <h3>재료</h3>
              <p>
                {recipe.ingredients?.join(", ") ||
                  "재료, 온마음, 정성, 조치, 심기, 차원"}
              </p>
            </div>

            <div className="section">
              <h3>레시피</h3>
              <ol>
                {recipe.instructions?.map(
                  (instruction, index) => (
                    <li key={index}>
                      {instruction}
                    </li>
                  )
                ) || [
                  <li key="1">
                    재료를 준비합니다.
                  </li>,
                  <li key="2">
                    순서대로 조리합니다.
                  </li>,
                  <li key="3">
                    맛을 확인합니다.
                  </li>,
                  <li key="4">
                    완성된 요리를 제공합니다.
                  </li>,
                ]}
              </ol>
            </div>

            <div className="section">
              <h3>요리 정보</h3>
              <div className="cooking-info">
                <p>
                  유형:{" "}
                  {recipe.mealType?.join(", ") ||
                    "일반식"}
                </p>
                <p>
                  출처: {recipe.cuisine || "기타"}
                </p>
                <p>
                  칼로리:{" "}
                  {recipe.caloriesPerServing ||
                    "정보 없음"}
                </p>
                <p>
                  평점: {recipe.rating || "4.0"} (
                  {recipe.reviewCount || 0}개
                  리뷰)
                </p>
                <p>
                  인분: {recipe.servings || 1}인분
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
