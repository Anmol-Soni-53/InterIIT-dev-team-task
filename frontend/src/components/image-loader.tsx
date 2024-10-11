import { useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ImageLoaderProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function Image({ src, alt, width, height, className = '' }: ImageLoaderProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')

  const handleLoad = () => setStatus('loaded')
  const handleError = () => setStatus('error')

  return (
    <div className="relative" style={{ width, height }}>
      {status === 'loading' && (
        <Skeleton 
          className="absolute inset-0 rounded-md" 
          style={{ width, height }}
        />
      )}
      {status === 'error' && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-muted rounded-md text-muted-foreground"
          style={{ width, height }}
        >
          Failed to load image
        </div>
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "rounded-md transition-opacity duration-300",
          status === 'loaded' ? 'opacity-100' : 'opacity-0',
          className
        )}
      />
    </div>
  )
}