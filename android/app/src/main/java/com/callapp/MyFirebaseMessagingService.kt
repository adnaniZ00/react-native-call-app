package com.callapp

import android.content.Intent
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class MyFirebaseMessagingService : FirebaseMessagingService() {

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)

        // Check if the message contains a data payload.
        remoteMessage.data.isNotEmpty().let {
            val type = remoteMessage.data["type"]

            // Check if this is an incoming call notification
            if (type == "incoming_call") {
                // Get the caller name from the notification data
                val callerName = remoteMessage.data["callerName"] ?: "Unknown Caller"

                // Create an Intent to launch our IncomingCallActivity
                val intent = Intent(this, IncomingCallActivity::class.java).apply {
                    // Add flags to start the activity in a new task, which is required when
                    // launching from a service.
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK
                    // Pass the caller name to the activity
                    putExtra("CALLER_NAME", callerName)
                }
                // Start the activity
                startActivity(intent)
            }
        }
    }
}