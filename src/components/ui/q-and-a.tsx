interface QandAProps {
  question: string;
  answer: string;
}

export function QandA({ question, answer }: QandAProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  );
}
