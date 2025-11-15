<template>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet" />

  <body>
    <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
    </div>

    <form class="card" @submit.prevent="register">
      <h3>Crear cuenta</h3>

      <div class="grid">
        <div class="field">
          <label for="firstname">Nombre</label>
          <input id="firstname" type="text" v-model="firstname" placeholder="Tu nombre" />
        </div>

        <div class="field">
          <label for="lastname">Apellido</label>
          <input id="lastname" type="text" v-model="lastname" placeholder="Tu apellido" />
        </div>

        <div class="field">
          <label for="birthdate">Fecha de nacimiento</label>
          <input id="birthdate" type="date" v-model="birthdate" />
        </div>

        <div class="field">
          <label for="country">País</label>
          <input id="country" type="text" v-model="country" placeholder="País" />
        </div>

        <div class="full field">
          <label for="address">Dirección</label>
          <input id="address" type="text" v-model="address" placeholder="Calle, número, ciudad" />
        </div>

        <div class="full field">
          <label for="email">Email</label>
          <input id="email" type="email" v-model="email" placeholder="tu@ejemplo.com" />
        </div>

        <div class="field">
          <label for="password">Contraseña</label>
          <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password"
            placeholder="Mínimo 6 caracteres" />
        </div>

        <div class="field">
          <label for="password_confirmation">Confirmar contraseña</label>
          <input id="password_confirmation" :type="showPassword ? 'text' : 'password'" v-model="password_confirmation"
            placeholder="Repite la contraseña" />
        </div>
      </div>

      <div class="options">
        <label class="showpass"><input type="checkbox" v-model="showPassword" /> Mostrar
          contraseña</label>
      </div>

      <button class="primary" :disabled="!formValid">Crear cuenta</button>

      <div class="social">
        <div class="go"><i class="fab fa-google"></i> Google</div>
        <div class="fb"><i class="fab fa-facebook"></i> Facebook</div>
      </div>
    </form>
  </body>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      firstname: "",
      lastname: "",
      birthdate: "",
      country: "",
      address: "",
      email: "",
      password: "",
      password_confirmation: "",
      showPassword: false,
    };
  },
  computed: {
    formValid() {
      // campos requeridos: firstname, lastname, email, password, password_confirmation
      if (!this.firstname || !this.lastname || !this.email) return false;
      if (!this.password || !this.password_confirmation) return false;
      if (this.password.length < 6) return false;
      if (this.password !== this.password_confirmation) return false;
      return true;
    },
  },
  methods: {
    register() {
      // Validación simple antes de enviar
      if (!this.formValid) {
        this.$notify &&
          this.$notify({
            type: "negative",
            message: "Por favor completa todos los campos requeridos.",
            position: "top-right",
          });
        return;
      }

      const payload = {
        firstname: this.firstname,
        lastname: this.lastname,
        birthdate: this.birthdate,
        country: this.country,
        address: this.address,
        email: this.email,
        password: this.password,
      };

      // Por ahora sólo mostramos en consola; si existe $api, se puede usar para enviar al backend
      console.log("Register payload:", payload);
      if (this.$api && typeof this.$api.post === "function") {
        // Intentar registro si el endpoint está definido en el backend
        const endpoint = "/api/user/signup";
        this.$api
          .post(endpoint, payload)
          .then((res) => {
            console.log("Registro exitoso:", res);
            this.$notify &&
              this.$notify({
                type: "positive",
                message: "Registro exitoso",
                position: "top-right",
              });
            // Redireccionar al login
            this.$router.push("/login");
          })
          .catch((err) => {
            this.$notify &&
              this.$notify({
                type: "negative",
                message: "Error en el registro: " + (err.message || err),
                position: "top-right",
              });
          });
      } else {
        this.$notify &&
          this.$notify({
            type: "positive",
            message: "Datos preparados localmente (sin envío al servidor).",
            position: "top-right",
          });
      }
    },
  },
};
</script>

<style scoped>
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: #080710;
  font-family: "Poppins", sans-serif;
}

.background {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background .shape {
  height: 260px;
  width: 260px;
  position: absolute;
  border-radius: 50%;
  opacity: 0.9;
}

.shape:first-child {
  background: linear-gradient(135deg, #1845ad 0%, #23a2f6 100%);
  left: -80px;
  top: -80px;
}

.shape:last-child {
  background: linear-gradient(135deg, #ff512f 0%, #f09819 100%);
  right: -60px;
  bottom: -100px;
}

.card {
  max-width: 920px;
  width: 92%;
  background-color: rgba(255, 255, 255, 0.06);
  margin: 40px auto;
  border-radius: 12px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
  padding: 28px;
  position: relative;
}

.card h3 {
  text-align: center;
  color: #fff;
  font-size: 26px;
  margin-bottom: 18px;
  font-weight: 600;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px 18px;
}

.field {
  display: flex;
  flex-direction: column;
}

.full {
  grid-column: 1 / -1;
}

label {
  color: #e6eefc;
  font-size: 13px;
  margin-bottom: 6px;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="date"] {
  height: 44px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: #fff;
  font-size: 14px;
}

input::placeholder {
  color: rgba(230, 230, 230, 0.45);
}

.options {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.showpass {
  color: #cfe3ff;
  font-size: 13px;
}

button.primary {
  margin-top: 18px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  background: linear-gradient(90deg, #23a2f6, #1845ad);
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-size: 15px;
}

button.primary[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.social {
  margin-top: 18px;
  display: flex;
  gap: 12px;
  justify-content: center;
}

.social div {
  min-width: 140px;
  border-radius: 8px;
  padding: 8px 12px;
  background-color: rgba(255, 255, 255, 0.06);
  color: #eaf0fb;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.social div:hover {
  background-color: rgba(255, 255, 255, 0.12);
}

.social i {
  margin-right: 6px;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .card {
    padding: 20px;
  }
}
</style>
