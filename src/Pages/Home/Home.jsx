import React, { useEffect, useMemo, useState } from 'react';
import { message } from 'antd';

import Hero from '../../components/Hero';
import LevelAndMode from '../../components/LevelAndMode';
import Stats from '../../components/Stats';
import MainGrid from '../../components/MainGrid';
import {
    getVocabularyByLevel,
    getVocabularyProgress,
    saveVocabularyProgress,
} from '../../services/vocabularyService';
import vi from '../../locales/vi';

const shuffleArray = array => {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
};

export default function Home() {
    const [selectedLevel, setSelectedLevel] = useState('N5');
    const [mode, setMode] = useState('all');
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [unknownIds, setUnknownIds] = useState([]);
    const [knownIds, setKnownIds] = useState([]);
    const [order, setOrder] = useState([]);

    // State lấy data
    const [vocabulary, setVocabulary] = useState([]);

    const unknownWords = useMemo(
        () => vocabulary.filter(w => unknownIds.includes(w.id)),
        [vocabulary, unknownIds]
    );

    const deck = useMemo(() => {
        const source = mode === 'unknown' ? unknownWords : vocabulary;
        return [...source].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
    }, [mode, unknownWords, vocabulary, order]);

    const safeIndex = Math.min(index, Math.max(0, deck.length - 1));
    const current = deck[safeIndex] || null;
    const knownCount = vocabulary.filter(w => knownIds.includes(w.id)).length;
    const progress = vocabulary.length ? Math.round((knownCount / vocabulary.length) * 100) : 0;

    const resetCard = () => {
        setIndex(0);
        setFlipped(false);
    };

    const changeLevel = level => {
        setSelectedLevel(level);
        setMode('all');
        resetCard();
    };

    const changeMode = newMode => {
        setMode(newMode);
        resetCard();
    };

    const next = () => {
        if (!deck.length) return;
        setIndex(i => (i + 1) % deck.length);
        setFlipped(false);
    };

    const previous = () => {
        if (!deck.length) return;
        setIndex(i => (i - 1 + deck.length) % deck.length);
        setFlipped(false);
    };

    // Function to mark the current word as known or unknown
    const mark = async isKnown => {
        if (!current) return;

        const id = current.id;
        const status = isKnown ? 'known' : 'unknown';

        try {
            await saveVocabularyProgress(id, status);

            setKnownIds(prev =>
                isKnown ? [...new Set([...prev, id])] : prev.filter(x => x !== id)
            );

            setUnknownIds(prev =>
                isKnown ? prev.filter(x => x !== id) : [...new Set([...prev, id])]
            );

            if (mode === 'unknown' && isKnown) {
                setIndex(i => Math.min(i, Math.max(0, deck.length - 2)));
                setFlipped(false);
            } else {
                next();
            }
        } catch (error) {
            console.error(error);
            message.error(vi.home.saveProgressFailed);
        }
    };

    const removeUnknown = id => {
        setUnknownIds(prev => prev.filter(x => x !== id));
        if (mode === 'unknown') {
            setIndex(i => Math.min(i, Math.max(0, deck.length - 2)));
            setFlipped(false);
        }
    };

    const shuffle = () => {
        setOrder(prev => shuffleArray(prev));
        resetCard();
        message.success(vi.home.shuffleSuccess);
    };

    const speak = event => {
        event?.stopPropagation();
        if (!current || !('speechSynthesis' in window)) {
            message.warning(vi.home.speechNotSupported);
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(current.word);
        utterance.lang = 'ja-JP';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        let active = true;

        const fetchData = async () => {
            try {
                const [words, progress] = await Promise.all([
                    getVocabularyByLevel(selectedLevel),
                    getVocabularyProgress(),
                ]);

                if (!active) return;

                const mappedWords = words.map(item => ({
                    id: item.id,
                    word: item.word,
                    reading: item.reading,
                    meaning: item.meaning_vi,
                    example: item.example_jp,
                    exampleMeaning: item.example_vi,
                    level: item.jlpt_level,
                }));

                const wordIds = new Set(mappedWords.map(w => w.id));
                const levelProgress = progress.filter(p => wordIds.has(p.vocabulary_id));

                setVocabulary(mappedWords);
                setOrder(mappedWords.map(w => w.id));

                setKnownIds(
                    levelProgress.filter(p => p.status === 'known').map(p => p.vocabulary_id)
                );

                setUnknownIds(
                    levelProgress.filter(p => p.status === 'unknown').map(p => p.vocabulary_id)
                );

                setIndex(0);
                setFlipped(false);
            } catch (error) {
                if (active) {
                    message.error(vi.home.loadVocabularyFailed);
                }
            }
        };

        fetchData();

        return () => {
            active = false;
        };
    }, [selectedLevel]);

    return (
        <>
            {/* Hero */}
            <Hero />

            {/* Level and mode */}
            <LevelAndMode
                selectedLevel={selectedLevel}
                mode={mode}
                vocabulary={vocabulary}
                unknownWords={unknownWords}
                changeLevel={changeLevel}
                changeMode={changeMode}
            />

            {/* Stats */}
            <Stats vocabulary={vocabulary} knownCount={knownCount} unknownWords={unknownWords} />

            {/* Main grid */}
            <MainGrid
                mode={mode}
                current={current}
                safeIndex={safeIndex}
                deck={deck}
                selectedLevel={selectedLevel}
                flipped={flipped}
                setFlipped={setFlipped}
                shuffle={shuffle}
                speak={speak}
                mark={mark}
                previous={previous}
                next={next}
                unknownWords={unknownWords}
                removeUnknown={removeUnknown}
                changeMode={changeMode}
                progress={progress}
                knownCount={knownCount}
                vocabulary={vocabulary}
            />
        </>
    );
}
