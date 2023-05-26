<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ForgetMail extends Mailable
{
    use Queueable, SerializesModels;

    public $token;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($token)
    {
        $this->data = $token;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'Forget Pass Mail',
        );
    }

    public function build()
    {
        $data = $this->data;
        return $this->from('support@pass.com')->view('mail.forget', compact('data'))->subject('Password Reset Link');
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    // public function content()
    // {
    //     $data = $this->data;
    //     // return $this->from('support@pass.com')->view('mail.forget', compact('data'))->subject('Password Reset Link');
    //     // return new Content(
    //     //     view: 'mail.forget',
    //     // );
    // }

    // /**
    //  * Get the attachments for the message.
    //  *
    //  * @return array
    //  */
    // public function attachments()
    // {
    //     return [];
    // }

    /**
     * Build the message.
     *
     * @return $this
     */
}
