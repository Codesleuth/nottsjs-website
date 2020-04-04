type Presenter = {
  presenter: string
  presenter_img: string
  presenter_url: string
  github_url: string
  twitter_url: string
}

function transformPresenter ({
  presenter,
  presenter_img,
  presenter_url,
  github_url,
  twitter_url
}: Presenter, presenter_bio_html: string) {
  return presenter ? ({
    name: presenter,
    bio: presenter_bio_html,
    img: presenter_img,
    url: presenter_url,
    githubUrl: github_url,
    twitterUrl: twitter_url
  }) : undefined
}

const suffixes: Record<string, string> = {
  one: 'st',
  two: 'nd',
  few: 'rd',
  other: 'th',
}

function formatTime24(date: string) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).format(new Date(date))
}

function formatTime12(date: string) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(new Date(date))
}

function formatLongDate(date: string) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).formatToParts(new Date(date))
  const weekday = parts.find(({ type }) => type === 'weekday')?.value
  const year = parts.find(({ type }) => type === 'year')?.value
  const month = parts.find(({ type }) => type === 'month')?.value
  const day = Number(parts.find(({ type }) => type === 'day')?.value || 0)
  const pr = new Intl.PluralRules('en-GB', { type: 'ordinal' })
  return `${weekday}, ${month} ${day}${suffixes[pr.select(day)]}, ${year}`
}

type EventNode = {
  html: string
  frontmatter: {
    path: string
    title: string
    start: string
    end: string
    meetup_url: string
  } & Presenter
  fields: any
}

export function transformEvent(eventNode: EventNode) {
  const {
    html,
    frontmatter: { path, title, start, end, meetup_url, ...otherFields },
    fields,
  } = eventNode

  const hasPast = new Date(start).valueOf() < Date.now().valueOf()

  const date = formatLongDate(start)
  const dateAndTime = `${formatLongDate(start)}, ${formatTime12(start)}`
  const startTime = formatTime24(start)
  const endTime = formatTime24(end)

  return {
    html,
    path,
    title,
    date,
    dateAndTime,
    hasPast,
    startTime,
    endTime,
    meetupUrl: meetup_url,
    presenter: transformPresenter(
      otherFields,
      (fields || {}).presenter_bio_html
    ),
  }
}
