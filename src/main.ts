import {
  assignMilestoneOnNewIssues,
  findMilestoneByName,
} from './milestone-actions'
import { getInput, info, setFailed } from '@actions/core'
import { context } from '@actions/github'

async function run(): Promise<void> {
  try {
    const token = getInput('repo-token', { required: true })
    const searchName = getInput('milestone', { required: true })

    const { title, id } = await findMilestoneByName(token, searchName)
    assignMilestoneOnNewIssues(token, id)

    info(
      /* eslint-disable-next-line i18n-text/no-en */
      `Milestone ${title} has been assigned to the issue #${context.payload.issue?.number} :white_check_mark:`,
    )
  } catch ({ message }) {
    setFailed(message as string)
  }
}

run()
