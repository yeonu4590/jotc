"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [minutes, setMinutes] = useState(15);
  const [remaining, setRemaining] = useState(minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [leftName, setLeftName] = useState("플레이어 1 닉네임");
  const [rightName, setRightName] = useState("플레이어 2 닉네임");
  const [leftClear, setLeftClear] = useState("0");
  const [leftSet, setLeftSet] = useState("0");
  const [rightClear, setRightClear] = useState("0");
  const [rightSet, setRightSet] = useState("0");
  const timerRef = useRef(null);

  useEffect(() => setRemaining(minutes * 60), [minutes]);

  useEffect(() => {
    if (isRunning && remaining > 0) {
      timerRef.current = setInterval(
        () => setRemaining((r) => Math.max(0, r - 1)),
        1000
      );
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (remaining === 0) setIsRunning(false);
  }, [remaining]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "1") setIsRunning((r) => !r);
      else if (e.key === "2") {
        setIsRunning(false);
        setRemaining(minutes * 60);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [minutes]);

  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>JOTC</h1>
          <div className={styles.event}>32강</div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.panelPrimary}>
          <div className={styles.bodyRowAudience}>
            <div className={styles.previewGridAudience}>
              {/* 왼쪽 카드 */}
              <div className={styles.previewCardAudience}>
                <textarea
                  value={leftName}
                  onChange={(e) => setLeftName(e.target.value)}
                  className={styles.nameInput}
                  rows={1}
                />
                <div className={styles.previewBodyAudience}>
                  <div className={styles.previewImageAudience}>
                    플레이어 1 화면을 넣으세요.
                  </div>
                </div>
                <div className={styles.previewFooterAudience}>
                  <div className={styles.scoreRow}>
                    <span className={styles.scoreLabel}>Clear :</span>
                    <textarea
                      value={leftClear}
                      onChange={(e) =>
                        setLeftClear(e.target.value.replace(/[^\d]/g, ""))
                      }
                      className={styles.scoreInput}
                      rows={1}
                    />
                    <span className={styles.scoreSep}>/</span>
                    <span className={styles.scoreLabel}>Set :</span>
                    <textarea
                      value={leftSet}
                      onChange={(e) =>
                        setLeftSet(e.target.value.replace(/[^\d]/g, ""))
                      }
                      className={styles.scoreInput}
                      rows={1}
                    />
                  </div>
                </div>
              </div>

              {/* 오른쪽 카드 */}
              <div className={styles.previewCardAudience}>
                <textarea
                  value={rightName}
                  onChange={(e) => setRightName(e.target.value)}
                  className={styles.nameInput}
                  rows={1}
                />
                <div className={styles.previewBodyAudience}>
                  <div className={styles.previewImageAudience}>
                    플레이어 2 화면을 넣으세요.
                  </div>
                </div>
                <div className={styles.previewFooterAudience}>
                  <div className={styles.scoreRow}>
                    <span className={styles.scoreLabel}>Clear :</span>
                    <textarea
                      value={rightClear}
                      onChange={(e) =>
                        setRightClear(e.target.value.replace(/[^\d]/g, ""))
                      }
                      className={styles.scoreInput}
                      rows={1}
                    />
                    <span className={styles.scoreSep}>/</span>
                    <span className={styles.scoreLabel}>Set :</span>
                    <textarea
                      value={rightSet}
                      onChange={(e) =>
                        setRightSet(e.target.value.replace(/[^\d]/g, ""))
                      }
                      className={styles.scoreInput}
                      rows={1}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.timerCardAudience}>
              <div className={styles.timeAudience}>{formatTime(remaining)}</div>
            </div>
          </div>

          <div className={styles.bottomBannerAudience}>
            <div>점수제</div>
            <div className={styles.sub}>60% : 2p, 80% : 3p, Clear : 6p</div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>1 시작/일시정지 · 2 리셋</footer>
    </div>
  );
}
