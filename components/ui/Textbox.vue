<template>
  <div class="group">
    <div class="floating-form">
      <div class="floating-label">
        <input
          class="floating-input bg-gray-100 border-b w-full rounded hover:bg-gray-300 focus:outline-none focus:border-pink-500"
          :class="cls"
          placeholder=" "
          v-bind="$attrs"
          :value="value"
          @input="$emit('input', $event.target.value)"
          @keyup="$emit('keyup', $event.target.value)"
          :type="type"
          :aria-label="label"
        />
        <span class="highlight"></span>
        <label>{{label}}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String },
    type: { type: String, default: "text" },
    value: { type: [Number, String] },
    cls: { type: String }
  }
};
</script>

<style scoped>
/* .group {
  position: relative;
  margin-bottom: 1.5rem;
}
label {
  pointer-events: none;
  position: absolute;
  left: 10px;
  top: 12px;
  color: rgba(0, 0, 0, 0.36);
  transition: all 0.2s ease;
}
input:focus {
  box-shadow: none;
  background-color: #eff1f4;
  border: none;
  border-bottom: 2px solid #ed54a4;
}
input {
  top: 20px;
  height: 48px;
  line-height: 20px;
  padding: 14px 12px 0;
}
input:focus + label,
input:valid + label {
  font-size: 75%;
  transform: translate3d(0, -10%, 0);
  opacity: 1;
  top: 5px;
} */

/****  floating-Lable style start ****/
.floating-label {
  position: relative;
}
.floating-input {
  font-size: 14px;
  padding: 4px 4px;
  display: block;
  width: 100%;
  height: 48px;
  padding: 14px 12px 0;
  /* background-color: lightgray; */
  border: none;
}

.floating-input:focus {
  outline: none;
  border-bottom: 2px solid #da1c5f;
}

label {
  color: #999;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 8px;
  top: 13px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.floating-input:focus ~ label,
.floating-input:not(:placeholder-shown) ~ label {
  top: -1px;
  font-size: 14px;
  color: #fb6340;
}

.floating-select:focus ~ label,
.floating-select:not([value=""]):valid ~ label {
  top: -18px;
  font-size: 14px;
  color: #fb6340;
}
</style>