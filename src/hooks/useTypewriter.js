import { useState, useEffect } from 'react';

/**
 * useTypewriter
 * Types a word one letter at a time, pauses, deletes it, then moves to the next word.
 *
 * @param {string[]} words        Words to cycle through.
 * @param {object}   [options]
 * @param {number}   [options.typeSpeed=80]    ms per typed letter.
 * @param {number}   [options.deleteSpeed=40]  ms per deleted letter.
 * @param {number}   [options.pause=1600]      ms to wait once a word is complete.
 * @returns {string} The text that should currently be displayed.
 */
export default function useTypewriter(words, { typeSpeed = 80, deleteSpeed = 40, pause = 1600 } = {}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return undefined;

    const currentWord = words[wordIndex % words.length];
    let delay = isDeleting ? deleteSpeed : typeSpeed;

    // Word fully typed: wait, then start deleting.
    if (!isDeleting && text === currentWord) {
      delay = pause;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && text === currentWord) {
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
      } else {
        const nextLength = text.length + (isDeleting ? -1 : 1);
        setText(currentWord.slice(0, nextLength));
      }
    }, delay);

    // Cleanup prevents stale timers when state changes or the component unmounts.
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return text;
}
