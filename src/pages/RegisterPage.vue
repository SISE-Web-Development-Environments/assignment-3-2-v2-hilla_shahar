<template>
    <div class="container">
        <h1 class="title">Register</h1>
        <b-form @submit.prevent="onRegister" @reset.prevent="onReset" class="form">
            <b-form-group
                    id="input-group-username"
                    label-cols-sm="3"
                    label="Username:"
                    label-for="username"
            >
                <b-form-input
                        id="username"
                        v-model="$v.form.username.$model"
                        type="text"
                        :state="validateState('username')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.username.required">
                    Username is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="$v.form.username.required && $v.form.username.length">
                    Username length should be between 3-8 characters long
                </b-form-invalid-feedback>
                <b-form-invalid-feedback  v-if="$v.form.username.required && $v.form.username.alpha">
                    Username should be only letters
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                    id="input-group-firstName"
                    label-cols-sm="3"
                    label="First Name:"
                    label-for="firstName"
            >
                <b-form-input
                        id="firstName"
                        v-model="$v.form.firstName.$model"
                        type="firstName"
                        :state="validateState('firstName')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.firstName.required">
                    First Name is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.form.firstName.length">
                    First Name length should be at least 2 characters
                </b-form-invalid-feedback>
            </b-form-group>


            <b-form-group
                    id="input-group-lastName"
                    label-cols-sm="3"
                    label="Last Name:"
                    label-for="lastName"
            >
                <b-form-input
                        id="lastName"
                        v-model="$v.form.lastName.$model"
                        type="lastName"
                        :state="validateState('lastName')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.lastName.required">
                    Last Name is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.form.lastName.length">
                    Last Name length should be at least 2 characters
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                    id="input-group-country"
                    label-cols-sm="3"
                    label="Country:"
                    label-for="country"
            >
                <b-form-select
                        id="country"
                        v-model="$v.form.country.$model"
                        :options="countries"
                        :state="validateState('country')"
                ></b-form-select>
                <b-form-invalid-feedback>
                    Country is required
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                    id="input-group-Password"
                    label-cols-sm="3"
                    label="Password:"
                    label-for="password"
            >
                <b-form-input
                        id="password"
                        type="password"
                        v-model="$v.form.password.$model"
                        :state="validateState('password')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.password.required">
                    Password is required
                </b-form-invalid-feedback>

                <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
                    Your password should be <strong>strong</strong>. <br />
                    For that, your password should be also:
                </b-form-text>

                <b-form-invalid-feedback  v-if="$v.form.password.required && !$v.form.password.length" >
                    Password length between 5-10 characters long
                </b-form-invalid-feedback>
                <b-form-invalid-feedback  v-if="$v.form.password.required && !$v.form.password.specialLetters" >
                    Password should contain at least one special character
                </b-form-invalid-feedback>
                <b-form-invalid-feedback  v-if="$v.form.password.required && !$v.form.password.number" >
                    Password should contain at least one number
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                    id="input-group-confirmedPassword"
                    label-cols-sm="3"
                    label="Confirm Password:"
                    label-for="confirmedPassword"
            >
                <b-form-input
                        id="confirmedPassword"
                        type="password"
                        v-model="$v.form.confirmedPassword.$model"
                        :state="validateState('confirmedPassword')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
                    Password confirmation is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.form.confirmedPassword.sameAsPassword" >
                    The confirmed password is not equal to the original password
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                    id="input-group-email"
                    label-cols-sm="3"
                    label="Email:"
                    label-for="email"
            >
                <b-form-input
                        id="email"
                        v-model="$v.form.email.$model"
                        type="email"
                        :state="validateState('email')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.email.required">
                    Email is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.email.email">
                    Email is not valid
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                    id="input-group-urlImage"
                    label-cols-sm="3"
                    label="Image url:"
                    label-for="urlImage"
            >
                <b-form-input
                        id="urlImage"
                        v-model="$v.form.urlImage.$model"
                        type="urlImage"
                        :state="validateState('urlImage')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.urlImage.required">
                    Image is required- need to load to "Cloudinary.com"
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.urlImage.url">
                    Image is not url
                </b-form-invalid-feedback>
            </b-form-group>

            <b-button type="reset" variant="danger" class="reset" >Reset</b-button>
            <b-button
                    type="submit"
                    variant="primary"
                    style="width:250px;"
                    class="ml-5 w-75"
                    id="reg"
            >Register</b-button
            >
            <div class="mt-2">
                You have an account already?
                <router-link to="login"> Log in here</router-link>
            </div>
        </b-form>
        <b-alert
                class="mt-2"
                v-if="form.submitError"
                variant="warning"
                dismissible
                show
        >
            Register failed: {{ form.submitError }}
        </b-alert>
    </div>
</template>

<script>
    import countries from "../assets/countries";
    import {
        required,
        minLength,
        maxLength,
        alpha,
        sameAs,
        email,
        url,
    } from "vuelidate/lib/validators";

    export default {
        name: "Register",
        data() {
            return {
                form: {
                    username: "",
                    firstName: "",
                    lastName: "",
                    country: null,
                    password: "",
                    confirmedPassword: "",
                    email: "",
                    submitError: undefined,
                    urlImage: ""
                },
                countries: [{ value: null, text: "", disabled: true }],
                errors: [],
                validated: false
            };
        },
        validations: {
            form: {
                username: {
                    required,
                    length: (u) => minLength(3)(u) && maxLength(8)(u),
                    alpha
                },
                firstName:{
                    required,
                    length: (f) => minLength(2)(f) && maxLength(40)(f)
                },
                lastName:{
                    required,
                    length: (l) => minLength(2)(l) && maxLength(40)(l)
                },
                country: {
                    required
                },
                password: {
                    required,
                    length: (p) => minLength(5)(p) && maxLength(10)(p),
                    number: (p) => /[0-9]/.test(p),
                    specialLetters: function(password){
                        return /[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/.test(password);
                    }
                },
                confirmedPassword: {
                    required,
                    sameAsPassword: sameAs("password")
                },
                email:{
                    required,
                    email,
                },
                urlImage:{
                    required,
                    url
                }
            }
        },
        mounted() {
            this.countries.push(...countries);
        },
        methods: {
            validateState(param) {
                const { $dirty, $error } = this.$v.form[param];
                return $dirty ? !$error : null;
            },
            async Register() {
                try {
                    const response = await this.axios.post(
                        "https://assignment3-2hilla-shahar.herokuapp.com/Register",
                        {
                            username: this.form.username,
                            password: this.form.password,
                            firstname: this.form.firstName,
                            lastname: this.form.lastName,
                            country: this.form.country,
                            email: this.form.email,
                            profileimage: this.form.urlImage
                        }
                    );
                    this.$router.push("/Login");
                } catch (err) {
                    console.log(err.response);
                    console.log(err.response.message);
                    this.form.submitError = "Please try to insert another username";
                }
            },
            onRegister() {
                this.$v.form.$touch();
                if (this.$v.form.$anyError) {
                    return;
                }
                // console.log("register method go");
                this.Register();
            },
            onReset() {
                this.form = {
                    username: "",
                    firstName: "",
                    lastName: "",
                    country: null,
                    password: "",
                    confirmedPassword: "",
                    email: "",
                    urlImage: "",
                };
                this.$nextTick(() => {
                    this.$v.$reset();
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    .container {
        max-width: 700px;
        background:rgba(255, 255, 255, 0.75);
    }
    h1{
        color: #7BB257;
        text-align: center;
        font-family: 'Architects Daughter';
        font-weight: bold;
    }
    form{
        color: #7a512f;
        font-family: 'Architects Daughter';
        text-align: center;
        font-weight: bold;
    }
    button.reset{
        color: #ffffff;
        background: #7BB257;
        border: #e1b4fc;
    }
    #reg{
        color: #ffffff;
        background: #7BB257;
        border: #e1b4fc;
    }


</style>
