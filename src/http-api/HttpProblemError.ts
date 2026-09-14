import type { HttpProblem } from './HttpProblem.ts'

export class HttpProblemError extends Error {
  readonly problem: HttpProblem
  constructor(problem: HttpProblem) {
    super(problem.detail)
    this.problem = problem
  }
}
