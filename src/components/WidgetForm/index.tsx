import { useState } from 'react'
import bugImageUrl from '../../assets/images/bug.svg'
import ideaImageUrl from '../../assets/images/idea.svg'
import thoughtImageUrl from '../../assets/images/thought.svg'
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep'
import { FeedbackContentStep } from './Steps/FeedbackContentStep'
import { FeedbackSucsessStep } from './Steps/FeedbackSuccessStep'

export const feedbackTypes = {
  BUG: {
    title: 'Bug',
    image: {
      src: bugImageUrl,
      alt: 'image of a bug'
    }
  },
  IDEA: {
    title: 'Idea',
    image: {
      src: ideaImageUrl,
      alt: 'image of a lamp'
    }
  },
  OTHER: {
    title: 'Other',
    image: {
      src: thoughtImageUrl,
      alt: 'image of a cloud'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleRestartFeedback() {
    setFeedbackSent(false)
    setFeedbackType(null)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSucsessStep onRestartFeedback={handleRestartFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onRestartFeedback={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}
      <footer className="text-xs text-neutral-400">
        Made by{' '}
        <a
          className="underline underline-offset-2"
          target="blank"
          href="https://portfolio-jovimoura.vercel.app/"
        >
          João Victor Moura
        </a>
      </footer>
    </div>
  )
}
