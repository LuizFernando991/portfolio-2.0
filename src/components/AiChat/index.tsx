import ChatWidget from './ChatWidget';
import styles from './AiChat.module.css';

export default function AiChat() {
  return (
    <section id="ai-chat" className={styles.aiChat}>
      <div className={styles.inner}>
        {/* Left */}
        <div className="ai-left reveal">
          <div className={`tag ${styles.aiTag}`}>✦ AI ASSISTANT</div>
          <h2 className={styles.title}>Pergunte qualquer coisa sobre min</h2>
          <p className={styles.desc}>
            Quer saber minha experiência com AWS? Qual stack eu domino? Como eu trabalho? Pergunta
            aqui — uma IA treinada com meu currículo vai responder.
          </p>
        </div>

        {/* Right */}
        <div className="ai-right reveal">
          <ChatWidget />
        </div>
      </div>
    </section>
  );
}
