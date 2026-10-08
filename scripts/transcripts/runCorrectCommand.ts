import { correctTranscript } from './correctTranscript.ts'
import { parseCorrectionArgs } from './parseCorrectionArgs.ts'
import { summarizeRun } from './summarizeRun.ts'

export async function runCorrectCommand(
  argv: readonly string[],
): Promise<void> {
  const { run, dropped, unreported } = await correctTranscript(
    parseCorrectionArgs(argv),
  )
  console.log(summarizeRun(run, dropped, unreported))
  if (dropped > 0)
    console.warn(
      `warning: dropped ${String(dropped)} edits whose text was not in the paragraph`,
    )
}
