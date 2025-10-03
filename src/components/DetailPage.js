import React, {
  useState,
  useEffect,
} from "react";
import {
  useParams,
  Link,
} from "react-router-dom";
import "./DetailPage.css";

const DetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipe(id);
  }, [id]);

  const fetchRecipe = async (recipeId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/recipes/${recipeId}`
      );
      const data = await response.json();
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
                Easy
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
                    <li
                      key={index}
                    >{`아이가 치료가`}</li>
                  )
                ) || [
                  <li key="1">아이가 치료가</li>,
                  <li key="2">아이가 치료가</li>,
                  <li key="3">아이가 치료가</li>,
                  <li key="4">아이가 치료가</li>,
                ]}
              </ol>
            </div>

            <div className="section">
              <h3>요리 정보</h3>
              <div className="cooking-info">
                <p>유형: 아이에탄</p>
                <p>출처: 저희식당</p>
                <p>칼로리: 500</p>
                <p>평점: 4.8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
