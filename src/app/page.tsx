'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useState } from 'react'


const Page = () => {
   const [value, setValue] = useState("")
    const trpc = useTRPC()
    const invoke = useMutation(trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.info('调用成功')
      }
    }))
  return (
    <div className='p-4 max-w-7xl mx-auto'>
      <Input value={value} onChange={e => setValue(e.target.value)} />
      <Button  onClick={() => invoke.mutate({ value })}>
        调用
      </Button>
    </div>
  );
}

export default Page