'use client'
import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';



const Page = () => {
    const trpc = useTRPC()
    const invoke = useMutation(trpc.hello.mutationOptions({
      onSuccess: () => {
        toast.info('调用成功')
      }
    }))
  return (
    <div className='p-4 max-w-7xl mx-auto'>
      <Button onClick={() => invoke.mutate({ text: 'hello world' })}>
        调用
      </Button>
    </div>
  );
}

export default Page