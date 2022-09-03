<?php

namespace App\Listeners;

use App\Events\UserCreatedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendEmailToDefinePassword
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\UserCreatedEvent  $event
     * @return void
     */
    public function handle(UserCreatedEvent $event)
    {
        /** @var User $user */
        $user = $event->getUser();
        $token = \Password::broker()->createToken($user);

        $user->sendPasswordResetNotification($token);
    }
}
