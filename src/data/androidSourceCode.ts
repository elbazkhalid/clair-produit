export interface AndroidFile {
  filename: string;
  path: string;
  language: string;
  description: string;
  content: string;
}

export const ANDROID_PROJECT_FILES: AndroidFile[] = [
  {
    filename: 'AndroidManifest.xml',
    path: 'app/src/main/AndroidManifest.xml',
    language: 'xml',
    description: 'Autorisations Android (Caméra, Internet) et configuration d’application',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Permissions requises pour le scanner et l'API -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-feature android:name="android.hardware.camera" android:required="false" />
    <uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />

    <application
        android:name=".ClairProduitApp"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.ClairProduit">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|screenLayout|keyboardHidden"
            android:theme="@style/Theme.ClairProduit">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- Métadonnées ML Kit pour télécharger le modèle de code-barres -->
        <meta-data
            android:name="com.google.mlkit.vision.DEPENDENCIES"
            android:value="barcode" />
    </application>

</manifest>`
  },
  {
    filename: 'build.gradle.kts',
    path: 'app/build.gradle.kts',
    language: 'kotlin',
    description: 'Dépendances Jetpack Compose, CameraX, ML Kit, Retrofit & Coil',
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.kapt)
}

android {
    namespace = "com.clairproduit.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.clairproduit.app"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.14"
    }
}

dependencies {
    // Jetpack Compose & Material 3
    implementation(platform("androidx.compose:compose-bom:2024.10.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")
    implementation("androidx.navigation:navigation-compose:2.8.3")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.6")

    // CameraX pour la capture vidéo fluide
    val cameraxVersion = "1.3.4"
    implementation("androidx.camera:camera-core:$cameraxVersion")
    implementation("androidx.camera:camera-camera2:$cameraxVersion")
    implementation("androidx.camera:camera-lifecycle:$cameraxVersion")
    implementation("androidx.camera:camera-view:$cameraxVersion")

    // Google ML Kit Barcode Scanning (rapide et gratuit, sur l'appareil)
    implementation("com.google.mlkit:barcode-scanning:17.3.0")

    // Retrofit & Moshi pour Open Food Facts & Open Beauty Facts
    implementation("com.squareup.retrofit2:retrofit:2.11.0")
    implementation("com.squareup.retrofit2:converter-moshi:2.11.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")

    // Coil pour le chargement asynchrone des photos de produits
    implementation("io.coil-kt:coil-compose:2.7.0")

    // Room DB pour l'historique et les favoris hors-ligne
    val roomVersion = "2.6.1"
    implementation("androidx.room:room-runtime:$roomVersion")
    implementation("androidx.room:room-ktx:$roomVersion")
    kapt("androidx.room:room-compiler:$roomVersion")

    // Tests unitaires
    testImplementation("junit:junit:4.13.2")
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.8.1")
}`
  },
  {
    filename: 'MainActivity.kt',
    path: 'app/src/main/java/com/clairproduit/app/MainActivity.kt',
    language: 'kotlin',
    description: 'Activité principale Jetpack Compose avec gestion des autorisations et RTL',
    content: `package com.clairproduit.app

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.core.content.ContextCompat
import com.clairproduit.app.ui.navigation.ClairProduitNavHost
import com.clairproduit.app.ui.theme.ClairProduitTheme

class MainActivity : ComponentActivity() {

    private var hasCameraPermission by mutableStateOf(false)

    private val cameraPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        hasCameraPermission = isGranted
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Vérifier l'autorisation caméra au démarrage
        hasCameraPermission = ContextCompat.checkSelfPermission(
            this,
            Manifest.permission.CAMERA
        ) == PackageManager.PERMISSION_GRANTED

        setContent {
            ClairProduitTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    ClairProduitNavHost(
                        hasCameraPermission = hasCameraPermission,
                        onRequestCameraPermission = {
                            cameraPermissionLauncher.launch(Manifest.permission.CAMERA)
                        }
                    )
                }
            }
        }
    }
}`
  },
  {
    filename: 'BarcodeScannerScreen.kt',
    path: 'app/src/main/java/com/clairproduit/app/ui/scanner/BarcodeScannerScreen.kt',
    language: 'kotlin',
    description: 'Écran de scan natif avec CameraX et ML Kit Barcode Analyzer',
    content: `package com.clairproduit.app.ui.scanner

import android.view.ViewGroup
import androidx.camera.core.*
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import com.google.mlkit.vision.barcode.BarcodeScanning
import com.google.mlkit.vision.barcode.common.Barcode
import com.google.mlkit.vision.common.InputImage
import java.util.concurrent.Executors

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BarcodeScannerScreen(
    onBarcodeScanned: (String) -> Unit,
    onNavigateBack: () -> Unit
) {
    val context = LocalContext.current
    val lifecycleOwner = LocalLifecycleOwner.current
    var isTorchOn by remember { mutableStateOf(false) }
    var cameraControl by remember { mutableStateOf<CameraControl?>(null) }
    var isProcessing by remember { mutableStateOf(false) }
    var showManualInputDialog by remember { mutableStateOf(false) }
    var manualBarcodeText by remember { mutableStateOf("") }

    Box(modifier = Modifier.fillMaxSize()) {
        // Flux vidéo de la caméra Android via CameraX
        AndroidView(
            modifier = Modifier.fillMaxSize(),
            factory = { ctx ->
                val previewView = PreviewView(ctx).apply {
                    layoutParams = ViewGroup.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT
                    )
                }

                val cameraProviderFuture = ProcessCameraProvider.getInstance(ctx)
                cameraProviderFuture.addListener({
                    val cameraProvider = cameraProviderFuture.get()
                    val preview = Preview.Builder().build().also {
                        it.setSurfaceProvider(previewView.surfaceProvider)
                    }

                    // Analyseur d'image Google ML Kit Barcode
                    val barcodeScanner = BarcodeScanning.getClient()
                    val imageAnalysis = ImageAnalysis.Builder()
                        .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                        .build()

                    val cameraExecutor = Executors.newSingleThreadExecutor()
                    imageAnalysis.setAnalyzer(cameraExecutor) { imageProxy ->
                        val mediaImage = imageProxy.image
                        if (mediaImage != null && !isProcessing) {
                            val image = InputImage.fromMediaImage(
                                mediaImage,
                                imageProxy.imageInfo.rotationDegrees
                            )
                            barcodeScanner.process(image)
                                .addOnSuccessListener { barcodes ->
                                    for (barcode in barcodes) {
                                        barcode.rawValue?.let { code ->
                                            if (code.isNotBlank() && !isProcessing) {
                                                isProcessing = true
                                                onBarcodeScanned(code)
                                            }
                                        }
                                    }
                                }
                                .addOnCompleteListener {
                                    imageProxy.close()
                                }
                        } else {
                            imageProxy.close()
                        }
                    }

                    try {
                        cameraProvider.unbindAll()
                        val camera = cameraProvider.bindToLifecycle(
                            lifecycleOwner,
                            CameraSelector.DEFAULT_BACK_CAMERA,
                            preview,
                            imageAnalysis
                        )
                        cameraControl = camera.cameraControl
                    } catch (exc: Exception) {
                        exc.printStackTrace()
                    }
                }, ContextCompat.getMainExecutor(ctx))

                previewView
            }
        )

        // Cadre de visée élégant
        Box(
            modifier = Modifier
                .size(280.dp, 180.dp)
                .align(Alignment.Center)
                .border(2.5.dp, Color(0xFF10B981), RoundedCornerShape(16.dp))
        )

        // Boutons de contrôle (Retour, Torche, Saisie manuelle)
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
                .align(Alignment.TopCenter),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            IconButton(
                onClick = onNavigateBack,
                colors = IconButtonDefaults.iconButtonColors(containerColor = Color.Black.copy(0.5f))
            ) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Retour", tint = Color.White)
            }

            IconButton(
                onClick = {
                    isTorchOn = !isTorchOn
                    cameraControl?.enableTorch(isTorchOn)
                },
                colors = IconButtonDefaults.iconButtonColors(containerColor = Color.Black.copy(0.5f))
            ) {
                Icon(
                    if (isTorchOn) Icons.Default.FlashOn else Icons.Default.FlashOff,
                    contentDescription = "Flash",
                    tint = Color.White
                )
            }
        }

        // Bouton de saisie manuelle en bas
        Button(
            onClick = { showManualInputDialog = true },
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .padding(bottom = 32.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF10B981))
        ) {
            Icon(Icons.Default.Keyboard, contentDescription = null)
            Spacer(modifier = Modifier.width(8.dp))
            Text("Saisir manuellement le code")
        }
    }

    if (showManualInputDialog) {
        AlertDialog(
            onDismissRequest = { showManualInputDialog = false },
            title = { Text("Code-barres manuel") },
            text = {
                OutlinedTextField(
                    value = manualBarcodeText,
                    onValueChange = { manualBarcodeText = it },
                    label = { Text("Ex: 6111029000123") }
                )
            },
            confirmButton = {
                Button(onClick = {
                    if (manualBarcodeText.isNotBlank()) {
                        showManualInputDialog = false
                        onBarcodeScanned(manualBarcodeText)
                    }
                }) {
                    Text("Valider")
                }
            },
            dismissButton = {
                TextButton(onClick = { showManualInputDialog = false }) {
                    Text("Annuler")
                }
            }
        )
    }
}`
  },
  {
    filename: 'OpenFoodFactsService.kt',
    path: 'app/src/main/java/com/clairproduit/app/data/api/OpenFoodFactsService.kt',
    language: 'kotlin',
    description: 'Interface Retrofit pour Open Food Facts et Open Beauty Facts',
    content: `package com.clairproduit.app.data.api

import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Headers
import retrofit2.http.Path
import retrofit2.http.Query

interface OpenFoodFactsService {

    @Headers("User-Agent: ClairProduit-Android/1.0 (contact@clairproduit.ma)")
    @GET("api/v2/product/{barcode}.json")
    suspend fun getFoodProductByBarcode(
        @Path("barcode") barcode: String
    ): Response<FoodProductResponseDto>

    @Headers("User-Agent: ClairProduit-Android/1.0 (contact@clairproduit.ma)")
    @GET("cgi/search.pl?action=process&json=1&page_size=20")
    suspend fun searchFood(
        @Query("search_terms") terms: String
    ): Response<SearchFoodResponseDto>
}

interface OpenBeautyFactsService {

    @Headers("User-Agent: ClairProduit-Android/1.0 (contact@clairproduit.ma)")
    @GET("api/v2/product/{barcode}.json")
    suspend fun getCosmeticProductByBarcode(
        @Path("barcode") barcode: String
    ): Response<CosmeticProductResponseDto>
}`
  },
  {
    filename: 'ProductViewModel.kt',
    path: 'app/src/main/java/com/clairproduit/app/ui/product/ProductViewModel.kt',
    language: 'kotlin',
    description: 'ViewModel MVVM gérant les états de chargement, d’erreur et d’évaluation',
    content: `package com.clairproduit.app.ui.product

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.clairproduit.app.data.repository.ProductRepository
import com.clairproduit.app.domain.model.Product
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

sealed interface ProductUiState {
    object Idle : ProductUiState
    object Loading : ProductUiState
    data class Success(val product: Product) : ProductUiState
    data class NotFound(val barcode: String) : ProductUiState
    data class Error(val message: String) : ProductUiState
}

class ProductViewModel(
    private val repository: ProductRepository = ProductRepository()
) : ViewModel() {

    private val _uiState = MutableStateFlow<ProductUiState>(ProductUiState.Idle)
    val uiState: StateFlow<ProductUiState> = _uiState.asStateFlow()

    fun scanOrFetchBarcode(barcode: String) {
        val cleanCode = barcode.trim()
        if (cleanCode.isBlank()) return

        _uiState.value = ProductUiState.Loading

        viewModelScope.launch {
            try {
                val product = repository.getProductByBarcode(cleanCode)
                if (product != null) {
                    _uiState.value = ProductUiState.Success(product)
                    repository.saveToHistory(product)
                } else {
                    _uiState.value = ProductUiState.NotFound(cleanCode)
                }
            } catch (e: Exception) {
                _uiState.value = ProductUiState.Error(
                    e.localizedMessage ?: "Erreur réseau inconnue"
                )
            }
        }
    }

    fun toggleFavorite(product: Product) {
        viewModelScope.launch {
            repository.toggleFavorite(product)
        }
    }
}`
  }
];
