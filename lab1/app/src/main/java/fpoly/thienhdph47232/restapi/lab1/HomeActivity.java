package fpoly.thienhdph47232.restapi.lab1;

import android.os.Bundle;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

public class HomeActivity extends AppCompatActivity {

    FirebaseAuth auth;
    TextView hiUser;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_home);

        FirebaseUser currentUser = auth.getCurrentUser();
        hiUser = findViewById(R.id.hiUser);

        if (currentUser != null) {
            hiUser.setText("Hi " + currentUser.getEmail());
            // Người dùng đã đăng nhập
        } else {
            hiUser.setText("You are not login!");
            // Người dùng chưa đăng nhập
        }
    }
}