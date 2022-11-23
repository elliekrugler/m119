# M5 Breakdown

Unlike M4, this setup uses twisting of the Arduino to move the paddle up or down. If the arduino is lifted up, the paddle will freeze.

This is an improvement on the M4 implementation because with the past implementation, the paddle could never stop. Also, the motion depended on rotating the arduino forwards or backwards, which is harder to achieve with your wrist.

This game was also extended to two players by having the keyboard control the left player while the Arduino still controls the right player via BLE.

The metrics for success would be user comfortability and how quickly it is to learn the controls. This method is more comfortable and achievable for the user. However, the prior method may have been more intuitive, since the rotation moved toward or away from the screen, which felt more like "up" or "down."
