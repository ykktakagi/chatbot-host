"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import type { StoryBookComponentProps } from "../../types/story";
import styles from "./story-book-component.module.css";

const StoryBookComponentInner = ({ storyData, propertyName = "物件" }: StoryBookComponentProps) => {
  const [currentScene, setCurrentScene] = useState(0);
  const totalScenes = storyData.scenes.length;

  const goToNextScene = () => {
    if (currentScene < totalScenes - 1) {
      setCurrentScene(currentScene + 1);
    }
  };

  const goToPreviousScene = () => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1);
    }
  };

  const goToScene = (sceneIndex: number) => {
    if (sceneIndex >= 0 && sceneIndex < totalScenes) {
      setCurrentScene(sceneIndex);
    }
  };

  const currentSceneData = storyData.scenes[currentScene];

  return (
    <div className={styles.storyBookContainer}>
      <div className={styles.storyBookHeader}>
        <h3 className={styles.storyTitle}>{storyData.title}</h3>
        <div className={styles.sceneIndicator}>
          {currentScene + 1} / {totalScenes}
        </div>
      </div>

      <div className={styles.storyContent}>
        <div className={styles.storyPage}>
          {currentSceneData.image && (
            <div className={styles.storyImage}>
              <img src={currentSceneData.image} alt={`Scene ${currentScene + 1}`} />
            </div>
          )}
          <div className={styles.storyText}>
            <p>{currentSceneData.text}</p>
          </div>
        </div>
      </div>

      <div className={styles.storyNavigation}>
        <button 
          className={styles.navButton}
          onClick={goToPreviousScene}
          disabled={currentScene === 0}
        >
          ← 前のページ
        </button>

        <div className={styles.sceneIndicators}>
          {storyData.scenes.map((_, index) => (
            <button
              key={index}
              className={`${styles.sceneIndicatorDot} ${
                index === currentScene ? styles.active : ""
              }`}
              onClick={() => goToScene(index)}
            />
          ))}
        </div>

        <button 
          className={styles.navButton}
          onClick={goToNextScene}
          disabled={currentScene === totalScenes - 1}
        >
          次のページ →
        </button>
      </div>

      <div className={styles.storyTags}>
        {currentSceneData.tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export const StoryBookComponent = dynamic(() => Promise.resolve(StoryBookComponentInner), {
  ssr: false
});
