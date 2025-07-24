package com.callapp

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.callapp.databinding.ActivityIncomingCallBinding

class IncomingCallActivity : AppCompatActivity() {

    private lateinit var binding: ActivityIncomingCallBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityIncomingCallBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Get the caller name from the intent that started this activity
        val callerName = intent.getStringExtra("CALLER_NAME") ?: "Unknown"
        binding.callerNameText.text = callerName

        binding.acceptButton.setOnClickListener {
            // Add logic for accepting the call
            finish() // Close the activity for now
        }

        binding.declineButton.setOnClickListener {
            // Add logic for declining the call
            finish() // Close the activity for now
        }
    }

}
