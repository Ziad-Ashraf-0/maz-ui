<script lang="ts" setup>
import { computed, defineProps, onBeforeUnmount, onMounted, ref } from 'vue'

interface MazAnimatedElementProps {
  /**
   * The direction of the animation
   * @default "up"
   * @values "up", "down", "left", "right"
   */
  direction?: 'up' | 'down' | 'left' | 'right'
  /**
   * The delay of the animation
   * @default 0
   */
  delay?: number
  /**
   * The duration of the animation
   * @default 2000
   */
  duration?: number
  /**
   * Play the animation only once
   * @default true
   */
  once?: boolean
}

const { direction = 'up', delay = 0, duration = 2000, once = true } = defineProps<MazAnimatedElementProps>()

const animatedClass = computed(() => `animate-slide-${direction}-blur`)

const element = ref<HTMLDivElement>()

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('--invisible')
      entry.target.classList.add(animatedClass.value)
      if (once === true) {
        observer?.unobserve(entry.target)
      }
    }
    else if (once === false) {
      entry.target.classList.add('--invisible')
      entry.target.classList.remove(animatedClass.value)
    }
  })

  if (element.value) {
    observer.observe(element.value)
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div
    ref="element"
    class="m-animated-element m-reset-css --invisible" :style="{
      animationDuration: `${duration}ms`,
      animationDelay: `${delay}ms`,
    }"
  >
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.m-animated-element {
  &.--invisible {
    @apply maz-invisible;
  }
}

@keyframes slide-up-blur {
  from {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes slide-down-blur {
  from {
    opacity: 0;
    transform: translateY(-20px);
    filter: blur(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes slide-left-blur {
  from {
    opacity: 0;
    transform: translateX(20px);
    filter: blur(10px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
}

@keyframes slide-right-blur {
  from {
    opacity: 0;
    transform: translateX(-20px);
    filter: blur(10px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
}

.animate-slide-up-blur {
  animation: slide-up-blur cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-down-blur {
  animation: slide-down-blur cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-left-blur {
  animation: slide-left-blur cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-right-blur {
  animation: slide-right-blur cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-up-blur,
.animate-slide-down-blur,
.animate-slide-left-blur,
.animate-slide-right-blur {
  opacity: 0;
}
</style>
