package fpoly.thienhdph47232.restapi.lab1;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.google.android.gms.auth.api.identity.BeginSignInRequest;
import com.google.android.gms.auth.api.identity.SignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.FirebaseNetworkException;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthEmailException;
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException;
import com.google.firebase.auth.FirebaseAuthInvalidUserException;
import com.google.firebase.auth.FirebaseAuthUserCollisionException;
import com.google.firebase.auth.FirebaseAuthWeakPasswordException;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.SignInMethodQueryResult;

import java.util.List;

public class MainActivity extends AppCompatActivity {

    Button loginWithGgButton, regBtn, loginBtn;
    BeginSignInRequest signInRequest;
    private FirebaseAuth mAuth;
    EditText userNameEdt, passwordEdt;

    private static final int RC_SIGN_IN = 9001;
    private GoogleSignInClient mGoogleSignInClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        mAuth = FirebaseAuth.getInstance();

        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_GAMES_SIGN_IN)
                .requestIdToken(getString(R.string.default_web_client_id))
                .requestEmail()
                .build();
        mGoogleSignInClient = GoogleSignIn.getClient(this, gso);

        
        userNameEdt = findViewById(R.id.usernameEdt);
        passwordEdt = findViewById(R.id.passwordEdt);
        regBtn = findViewById(R.id.regBtn);
        loginBtn = findViewById(R.id.loginBtn);
        loginWithGgButton = findViewById(R.id.loginWithGgButton);

        loginWithGgButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                LoginWithGG();
            }
        });

        RegAccount();
        Login();
    }

    private void LoginWithGG() {
        Intent signIntent = mGoogleSignInClient.getSignInIntent();
        startActivityForResult(signIntent, RC_SIGN_IN);
    }

    private void Login() {
        loginBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String user = userNameEdt.getText().toString();
                String pass = passwordEdt.getText().toString();

                if (user.isEmpty() || pass.isEmpty()){
                    Toast.makeText(MainActivity.this, "User or password is empty!", Toast.LENGTH_SHORT).show();
                } else {
                    mAuth.fetchSignInMethodsForEmail(user)
                            .addOnCompleteListener(new OnCompleteListener<SignInMethodQueryResult>() {
                                @Override
                                public void onComplete(@NonNull Task<SignInMethodQueryResult> task) {
                                    if (task.isSuccessful()) {
                                            mAuth.signInWithEmailAndPassword(user, pass)
                                                    .addOnCompleteListener(MainActivity.this, new OnCompleteListener<AuthResult>() {
                                                        @Override
                                                        public void onComplete(@NonNull Task<AuthResult> task) {
                                                            if (task.isSuccessful()) {
                                                                Toast.makeText(MainActivity.this, "Login successfully", Toast.LENGTH_SHORT).show();
                                                                startActivity(new Intent(MainActivity.this, HomeActivity.class));
                                                            }
                                                            else {
                                                                String errorMessage = getFirebaseAuthErrorMessage(task.getException());
                                                                Toast.makeText(MainActivity.this, "Error: " + errorMessage, Toast.LENGTH_LONG).show();
                                                            }
                                                        }
                                                    });
                                    }
                                }
                            });
                }
            }
        });
    }
    private String getFirebaseAuthErrorMessage(Exception exception) {
        if (exception instanceof FirebaseAuthInvalidUserException) {
            return "Tài khoản không tồn tại hoặc đã bị vô hiệu hóa.";
        } else if (exception instanceof FirebaseAuthInvalidCredentialsException) {
            return "Mật khẩu hoặc email không đúng.";
        } else if (exception instanceof FirebaseAuthUserCollisionException) {
            return "Tài khoản này đã được sử dụng.";
        } else if (exception instanceof FirebaseAuthWeakPasswordException) {
            return "Mật khẩu quá yếu, vui lòng nhập mật khẩu mạnh hơn.";
        } else if (exception instanceof FirebaseAuthEmailException) {
            return "Có lỗi xảy ra với địa chỉ email này.";
        } else if (exception instanceof FirebaseNetworkException) {
            return "Không có kết nối mạng, vui lòng kiểm tra lại.";
        } else {
            return "Có lỗi xảy ra. Vui lòng thử lại sau.";
        }
    }



        public void RegAccount(){
            regBtn.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            String user = userNameEdt.getText().toString();
                String pass = passwordEdt.getText().toString();

                if (!user.isEmpty() && !pass.isEmpty()){
                    mAuth.fetchSignInMethodsForEmail(user)
                            .addOnCompleteListener(new OnCompleteListener<SignInMethodQueryResult>() {
                                @Override
                                public void onComplete(@NonNull Task<SignInMethodQueryResult> task) {
                                    if (task.isSuccessful()){
                                        SignInMethodQueryResult result = task.getResult();
                                        List<String> signInMethods = result.getSignInMethods();
                                        if (signInMethods != null && !signInMethods.isEmpty()){
                                            Toast.makeText(MainActivity.this, "Email is exist!", Toast.LENGTH_SHORT).show();
                                        } else {
                                            mAuth.createUserWithEmailAndPassword(user, pass).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                                                @Override
                                                public void onComplete(@NonNull Task<AuthResult> task) {
                                                    if (task.isSuccessful()) {
                                                        FirebaseUser user = mAuth.getCurrentUser();
                                                        Toast.makeText(MainActivity.this, user.getEmail() + "Register succesfully!", Toast.LENGTH_SHORT).show();
                                                    } else {
                                                        Log.w("Main", "createUserWithEmail:failure", task.getException());
                                                        Toast.makeText(MainActivity.this, "Error :" + task.getException(), Toast.LENGTH_SHORT).show();
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }
                            });
                } else {
                    Toast.makeText(MainActivity.this, "User or password is empty!", Toast.LENGTH_SHORT).show();
                }

            }
        });
    }
}