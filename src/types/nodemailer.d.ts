declare module 'nodemailer' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export interface MailOptions {
    from?: string
    to?: string | string[]
    subject?: string
    text?: string
    html?: string
    [key: string]: unknown
  }

  export interface Transporter {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMail(mailOptions: MailOptions): Promise<{ messageId: string; [key: string]: unknown }>
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function createTransport(options: Record<string, unknown>): Transporter
}
