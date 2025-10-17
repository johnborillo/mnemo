'use client'
import JournalEntryForm from "../components/JournalEntryForm";

export default function Journal() {

  return (
    <>
      <head>
        <title>Log - mnemo</title>
      </head>
      <div className="container mx-auto px-4">
        <JournalEntryForm />
      </div>
    </>
  )
}
