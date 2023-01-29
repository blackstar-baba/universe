## description

代码
```
/**
 *使用此命令运行以显示本机程序集：<br/>
 * Java -XX:+UnlockDiagnosticVMOptions
 * -XX:CompileCommand=print,VectorizationMicroBenchmark.square
 * VectorizationMicroBenchmark
 */
public class VectorizationMicroBenchmark {

    private static void square(float[] a) {
        for (int i = 0; i < a.length; i++) {
            a[i] = a[i] * a[i]; // line 11
        }
    }

    public static void main(String[] args) throws Exception {
        float[] a = new float[1024];

        // repeatedly invoke the method under test. this
        // causes the JIT compiler to optimize the method
        for (int i = 0; i < 1000 * 1000; i++) {
            square(a);
        }
        //vm options
        //-XX:+UnlockDiagnosticVMOptions -XX:+DebugNonSafepoints  -XX:CompileCommand=print,VectorizationMicroBenchmark.square
        // vmulps Parallel Scalar 平行标量
        // vmulss Single Scalar 单标量
    }

}

```
输出
```
CompilerOracle: print VectorizationMicroBenchmark.square
Compiled method (c1)      89   26 %     3       VectorizationMicroBenchmark::square @ 2 (25 bytes)
 total in heap  [0x000000010ae66c50,0x000000010ae671a0] = 1360
 relocation     [0x000000010ae66d78,0x000000010ae66db8] = 64
 main code      [0x000000010ae66dc0,0x000000010ae66f80] = 448
 stub code      [0x000000010ae66f80,0x000000010ae67010] = 144
 oops           [0x000000010ae67010,0x000000010ae67018] = 8
 metadata       [0x000000010ae67018,0x000000010ae67020] = 8
 scopes data    [0x000000010ae67020,0x000000010ae67088] = 104
 scopes pcs     [0x000000010ae67088,0x000000010ae67188] = 256
 dependencies   [0x000000010ae67188,0x000000010ae67190] = 8
 nul chk table  [0x000000010ae67190,0x000000010ae671a0] = 16
Loaded disassembler from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/server/hsdis-amd64.dylib
Decoding compiled method 0x000000010ae66c50:
Code:
[Disassembling for mach='i386:x86-64']
[Entry Point]
[Verified Entry Point]
[Constants]
  # {method} {0x0000000122d02aa8} 'square' '([F)V' in 'VectorizationMicroBenchmark'
  0x000000010ae66dc0: mov    %eax,-0x14000(%rsp)
  0x000000010ae66dc7: push   %rbp
  0x000000010ae66dc8: sub    $0x50,%rsp
  0x000000010ae66dcc: movabs $0x122d02c98,%rdi  ;   {metadata(method data for {method} {0x0000000122d02aa8} 'square' '([F)V' in 'VectorizationMicroBenchmark')}
  0x000000010ae66dd6: mov    0xdc(%rdi),%ebx
  0x000000010ae66ddc: add    $0x8,%ebx
  0x000000010ae66ddf: mov    %ebx,0xdc(%rdi)
  0x000000010ae66de5: movabs $0x122d02aa8,%rdi  ;   {metadata({method} {0x0000000122d02aa8} 'square' '([F)V' in 'VectorizationMicroBenchmark')}
  0x000000010ae66def: and    $0x1ff8,%ebx
  0x000000010ae66df5: cmp    $0x0,%ebx
  0x000000010ae66df8: je     0x000000010ae66ef9  ;*iconst_0
                                                ; - VectorizationMicroBenchmark::square@0 (line 3)

  0x000000010ae66dfe: mov    $0x0,%edi
  0x000000010ae66e03: jmpq   0x000000010ae66e7e  ;*iload_1
                                                ; - VectorizationMicroBenchmark::square@2 (line 3)

  0x000000010ae66e08: movslq %edi,%rbx
  0x000000010ae66e0b: cmp    0xc(%rsi),%edi
  0x000000010ae66e0e: jae    0x000000010ae66f10
  0x000000010ae66e14: vmovss 0x10(%rsi,%rbx,4),%xmm0  ;*faload
                                                ; - VectorizationMicroBenchmark::square@12 (line 4)

  0x000000010ae66e1a: vmovaps %xmm0,%xmm1
  0x000000010ae66e1e: vmulss %xmm0,%xmm1,%xmm1
  0x000000010ae66e22: movslq %edi,%rbx
  0x000000010ae66e25: cmp    0xc(%rsi),%edi
  0x000000010ae66e28: jae    0x000000010ae66f19
  0x000000010ae66e2e: vmovss %xmm1,0x10(%rsi,%rbx,4)  ;*fastore
                                                ; - VectorizationMicroBenchmark::square@17 (line 4)

  0x000000010ae66e34: inc    %edi
  0x000000010ae66e36: movabs $0x122d02c98,%rbx  ;   {metadata(method data for {method} {0x0000000122d02aa8} 'square' '([F)V' in 'VectorizationMicroBenchmark')}
  0x000000010ae66e40: mov    0xe0(%rbx),%eax
  0x000000010ae66e46: add    $0x8,%eax
  0x000000010ae66e49: mov    %eax,0xe0(%rbx)
  0x000000010ae66e4f: movabs $0x122d02aa8,%rbx  ;   {metadata({method} {0x0000000122d02aa8} 'square' '([F)V' in 'VectorizationMicroBenchmark')}
  0x000000010ae66e59: and    $0xfff8,%eax
  0x000000010ae66e5f: cmp    $0x0,%eax
  0x000000010ae66e62: je     0x000000010ae66f22  ; OopMap{rsi=Oop off=168}
                                                ;*goto
                                                ; - VectorizationMicroBenchmark::square@21 (line 3)

  0x000000010ae66e68: test   %eax,-0x2202d6e(%rip)        # 0x0000000108c64100
                                                ;   {poll}
  0x000000010ae66e6e: movabs $0x122d02c98,%rbx  ;   {metadata(method data for {method} {0x0000000122d02aa8} 'square' '([F)V' in 'VectorizationMicroBenchmark')}
  0x000000010ae66e78: incl   0x128(%rbx)        ;*goto
                                                ; - VectorizationMicroBenchmark::square@21 (line 3)

  0x000000010ae66e7e: mov    0xc(%rsi),%ebx     ;*arraylength
                                                ; - VectorizationMicroBenchmark::square@4 (line 3)
                                                ; implicit exception: dispatches to 0x000000010ae66f39
  0x000000010ae66e81: cmp    %ebx,%edi
  0x000000010ae66e83: movabs $0x122d02c98,%rbx  ;   {metadata(method data for {method} {0x0000000122d02aa8} 'square' '([F)V' in 'VectorizationMicroBenchmark')}
  0x000000010ae66e8d: movabs $0x108,%rax
  0x000000010ae66e97: jge    0x000000010ae66ea7
  0x000000010ae66e9d: movabs $0x118,%rax
  0x000000010ae66ea7: mov    (%rbx,%rax,1),%rdx
  0x000000010ae66eab: lea    0x1(%rdx),%rdx
  0x000000010ae66eaf: mov    %rdx,(%rbx,%rax,1)
  0x000000010ae66eb3: jl     0x000000010ae66e08  ;*if_icmpge
                                                ; - VectorizationMicroBenchmark::square@5 (line 3)

  0x000000010ae66eb9: add    $0x50,%rsp
  0x000000010ae66ebd: pop    %rbp
  0x000000010ae66ebe: test   %eax,-0x2202dc4(%rip)        # 0x0000000108c64100
                                                ;   {poll_return}
  0x000000010ae66ec4: retq                      ;*return
                                                ; - VectorizationMicroBenchmark::square@24 (line 6)

  0x000000010ae66ec5: mov    %eax,-0x14000(%rsp)
  0x000000010ae66ecc: push   %rbp
  0x000000010ae66ecd: sub    $0x50,%rsp
  0x000000010ae66ed1: mov    0x8(%rsi),%rbx
  0x000000010ae66ed5: mov    (%rsi),%eax
  0x000000010ae66ed7: mov    %rsi,%rdi
  0x000000010ae66eda: mov    %rbx,0x38(%rsp)
  0x000000010ae66edf: mov    %eax,0x30(%rsp)
  0x000000010ae66ee3: callq  0x000000010a0d751e  ;   {runtime_call}
  0x000000010ae66ee8: mov    0x30(%rsp),%eax
  0x000000010ae66eec: mov    %rax,%rdi
  0x000000010ae66eef: mov    0x38(%rsp),%rbx
  0x000000010ae66ef4: mov    %rbx,%rsi
  0x000000010ae66ef7: jmp    0x000000010ae66e7e
  0x000000010ae66ef9: mov    %rdi,0x8(%rsp)
  0x000000010ae66efe: movq   $0xffffffffffffffff,(%rsp)
  0x000000010ae66f06: callq  0x000000010ae4fd20  ; OopMap{rsi=Oop off=331}
                                                ;*synchronization entry
                                                ; - VectorizationMicroBenchmark::square@-1 (line 3)
                                                ;   {runtime_call}
  0x000000010ae66f0b: jmpq   0x000000010ae66dfe
  0x000000010ae66f10: mov    %rdi,(%rsp)
  0x000000010ae66f14: callq  0x000000010ac1c080  ; OopMap{rsi=Oop off=345}
                                                ;*faload
                                                ; - VectorizationMicroBenchmark::square@12 (line 4)
                                                ;   {runtime_call}
  0x000000010ae66f19: mov    %rdi,(%rsp)
  0x000000010ae66f1d: callq  0x000000010ac1c080  ; OopMap{rsi=Oop off=354}
                                                ;*fastore
                                                ; - VectorizationMicroBenchmark::square@17 (line 4)
                                                ;   {runtime_call}
  0x000000010ae66f22: mov    %rbx,0x8(%rsp)
  0x000000010ae66f27: movq   $0x15,(%rsp)
  0x000000010ae66f2f: callq  0x000000010ae4fd20  ; OopMap{rsi=Oop off=372}
                                                ;*goto
                                                ; - VectorizationMicroBenchmark::square@21 (line 3)
                                                ;   {runtime_call}
  0x000000010ae66f34: jmpq   0x000000010ae66e68
  0x000000010ae66f39: callq  0x000000010ac1b9c0  ; OopMap{rsi=Oop off=382}
                                                ;*arraylength
                                                ; - VectorizationMicroBenchmark::square@4 (line 3)
                                                ;   {runtime_call}
  0x000000010ae66f3e: nop
  0x000000010ae66f3f: nop
  0x000000010ae66f40: mov    0x2a8(%r15),%rax
  0x000000010ae66f47: movabs $0x0,%r10
  0x000000010ae66f51: mov    %r10,0x2a8(%r15)
  0x000000010ae66f58: movabs $0x0,%r10
  0x000000010ae66f62: mov    %r10,0x2b0(%r15)
  0x000000010ae66f69: add    $0x50,%rsp
  0x000000010ae66f6d: pop    %rbp
  0x000000010ae66f6e: jmpq   0x000000010ac18e20  ;   {runtime_call}
  0x000000010ae66f73: hlt    
  0x000000010ae66f74: hlt    
  0x000000010ae66f75: hlt    
  0x000000010ae66f76: hlt    
  0x000000010ae66f77: hlt    
  0x000000010ae66f78: hlt    
  0x000000010ae66f79: hlt    
  0x000000010ae66f7a: hlt    
  0x000000010ae66f7b: hlt    
  0x000000010ae66f7c: hlt    
  0x000000010ae66f7d: hlt    
  0x000000010ae66f7e: hlt    
  0x000000010ae66f7f: hlt    
[Exception Handler]
[Stub Code]
  0x000000010ae66f80: callq  0x000000010ac199a0  ;   {no_reloc}
  0x000000010ae66f85: mov    %rsp,-0x28(%rsp)
  0x000000010ae66f8a: sub    $0x80,%rsp
  0x000000010ae66f91: mov    %rax,0x78(%rsp)
  0x000000010ae66f96: mov    %rcx,0x70(%rsp)
  0x000000010ae66f9b: mov    %rdx,0x68(%rsp)
  0x000000010ae66fa0: mov    %rbx,0x60(%rsp)
  0x000000010ae66fa5: mov    %rbp,0x50(%rsp)
  0x000000010ae66faa: mov    %rsi,0x48(%rsp)
  0x000000010ae66faf: mov    %rdi,0x40(%rsp)
  0x000000010ae66fb4: mov    %r8,0x38(%rsp)
  0x000000010ae66fb9: mov    %r9,0x30(%rsp)
  0x000000010ae66fbe: mov    %r10,0x28(%rsp)
  0x000000010ae66fc3: mov    %r11,0x20(%rsp)
  0x000000010ae66fc8: mov    %r12,0x18(%rsp)
  0x000000010ae66fcd: mov    %r13,0x10(%rsp)
  0x000000010ae66fd2: mov    %r14,0x8(%rsp)
  0x000000010ae66fd7: mov    %r15,(%rsp)
  0x000000010ae66fdb: movabs $0x10a1d0764,%rdi  ;   {external_word}
  0x000000010ae66fe5: movabs $0x10ae66f85,%rsi  ;   {internal_word}
  0x000000010ae66fef: mov    %rsp,%rdx
  0x000000010ae66ff2: and    $0xfffffffffffffff0,%rsp
  0x000000010ae66ff6: callq  0x0000000109ff49e2  ;   {runtime_call}
  0x000000010ae66ffb: hlt    
[Deopt Handler Code]
  0x000000010ae66ffc: movabs $0x10ae66ffc,%r10  ;   {section_word}
  0x000000010ae67006: push   %r10
  0x000000010ae67008: jmpq   0x000000010abf1500  ;   {runtime_call}
  0x000000010ae6700d: hlt    
  0x000000010ae6700e: hlt    
  0x000000010ae6700f: hlt    
OopMapSet contains 6 OopMaps

#0 
OopMap{rsi=Oop off=168}
#1 
OopMap{rsi=Oop off=331}
#2 
OopMap{rsi=Oop off=345}
#3 
OopMap{rsi=Oop off=354}
#4 
OopMap{rsi=Oop off=372}
#5 
OopMap{rsi=Oop off=382}
Compiled method (c2)     164   27       4       VectorizationMicroBenchmark::square (25 bytes)
 total in heap  [0x000000010ae6bc50,0x000000010ae6c0a8] = 1112
 relocation     [0x000000010ae6bd78,0x000000010ae6bd88] = 16
 main code      [0x000000010ae6bda0,0x000000010ae6bea0] = 256
 stub code      [0x000000010ae6bea0,0x000000010ae6beb8] = 24
 oops           [0x000000010ae6beb8,0x000000010ae6bec0] = 8
 metadata       [0x000000010ae6bec0,0x000000010ae6bec8] = 8
 scopes data    [0x000000010ae6bec8,0x000000010ae6bf10] = 72
 scopes pcs     [0x000000010ae6bf10,0x000000010ae6c090] = 384
 dependencies   [0x000000010ae6c090,0x000000010ae6c098] = 8
 nul chk table  [0x000000010ae6c098,0x000000010ae6c0a8] = 16
Decoding compiled method 0x000000010ae6bc50:
Code:
[Entry Point]
[Verified Entry Point]
[Constants]
  # {method} {0x0000000122d02aa8} 'square' '([F)V' in 'VectorizationMicroBenchmark'
  # parm0:    rsi:rsi   = '[F'
  #           [sp+0x20]  (sp of caller)
  0x000000010ae6bda0: mov    %eax,-0x14000(%rsp)
  0x000000010ae6bda7: push   %rbp
  0x000000010ae6bda8: sub    $0x10,%rsp         ;*synchronization entry
                                                ; - VectorizationMicroBenchmark::square@-1 (line 3)

  0x000000010ae6bdac: mov    0xc(%rsi),%r11d    ;*arraylength
                                                ; - VectorizationMicroBenchmark::square@4 (line 3)
                                                ; implicit exception: dispatches to 0x000000010ae6be85
  0x000000010ae6bdb0: test   %r11d,%r11d
  0x000000010ae6bdb3: jle    0x000000010ae6be5e  ;*if_icmpge
                                                ; - VectorizationMicroBenchmark::square@5 (line 3)

  0x000000010ae6bdb9: test   %r11d,%r11d
  0x000000010ae6bdbc: jbe    0x000000010ae6be6d
  0x000000010ae6bdc2: mov    %r11d,%r10d
  0x000000010ae6bdc5: dec    %r10d
  0x000000010ae6bdc8: cmp    %r11d,%r10d
  0x000000010ae6bdcb: jae    0x000000010ae6be6d
  0x000000010ae6bdd1: mov    %esi,%r9d
  0x000000010ae6bdd4: shr    $0x2,%r9d
  0x000000010ae6bdd8: and    $0x7,%r9d
  0x000000010ae6bddc: xor    %r8d,%r8d
  0x000000010ae6bddf: mov    $0x3,%ecx
  0x000000010ae6bde4: sub    %r9d,%ecx
  0x000000010ae6bde7: and    $0x7,%ecx
  0x000000010ae6bdea: inc    %ecx
  0x000000010ae6bdec: cmp    %r11d,%ecx
  0x000000010ae6bdef: cmovg  %r11d,%ecx         ;*aload_0
                                                ; - VectorizationMicroBenchmark::square@8 (line 4)

  0x000000010ae6bdf3: vmovss 0x10(%rsi,%r8,4),%xmm1  ;*faload
                                                ; - VectorizationMicroBenchmark::square@12 (line 4)

  0x000000010ae6bdfa: vmulss %xmm1,%xmm1,%xmm0
  0x000000010ae6bdfe: vmovss %xmm0,0x10(%rsi,%r8,4)  ;*fastore
                                                ; - VectorizationMicroBenchmark::square@17 (line 4)

  0x000000010ae6be05: inc    %r8d               ;*iinc
                                                ; - VectorizationMicroBenchmark::square@18 (line 3)

  0x000000010ae6be08: cmp    %ecx,%r8d
  0x000000010ae6be0b: jl     0x000000010ae6bdf3  ;*if_icmpge
                                                ; - VectorizationMicroBenchmark::square@5 (line 3)

  0x000000010ae6be0d: mov    %r11d,%ecx
  0x000000010ae6be10: add    $0xfffffff9,%ecx
  0x000000010ae6be13: mov    $0x80000000,%ebx
  0x000000010ae6be18: cmp    %ecx,%r10d
  0x000000010ae6be1b: cmovl  %ebx,%ecx
  0x000000010ae6be1e: cmp    %ecx,%r8d
  0x000000010ae6be21: jge    0x000000010ae6be3e  ;*aload_0
                                                ; - VectorizationMicroBenchmark::square@8 (line 4)

  0x000000010ae6be23: vmovdqu 0x10(%rsi,%r8,4),%ymm0  ;*faload
                                                ; - VectorizationMicroBenchmark::square@12 (line 4)

  0x000000010ae6be2a: vmulps %ymm0,%ymm0,%ymm0
  0x000000010ae6be2e: vmovdqu %ymm0,0x10(%rsi,%r8,4)  ;*fastore
                                                ; - VectorizationMicroBenchmark::square@17 (line 4)

  0x000000010ae6be35: add    $0x8,%r8d          ;*iinc
                                                ; - VectorizationMicroBenchmark::square@18 (line 3)

  0x000000010ae6be39: cmp    %ecx,%r8d
  0x000000010ae6be3c: jl     0x000000010ae6be23  ;*if_icmpge
                                                ; - VectorizationMicroBenchmark::square@5 (line 3)

  0x000000010ae6be3e: cmp    %r11d,%r8d
  0x000000010ae6be41: jge    0x000000010ae6be5e
  0x000000010ae6be43: nop                       ;*aload_0
                                                ; - VectorizationMicroBenchmark::square@8 (line 4)

  0x000000010ae6be44: vmovss 0x10(%rsi,%r8,4),%xmm1  ;*faload
                                                ; - VectorizationMicroBenchmark::square@12 (line 4)

  0x000000010ae6be4b: vmulss %xmm1,%xmm1,%xmm0
  0x000000010ae6be4f: vmovss %xmm0,0x10(%rsi,%r8,4)  ;*fastore
                                                ; - VectorizationMicroBenchmark::square@17 (line 4)

  0x000000010ae6be56: inc    %r8d               ;*iinc
                                                ; - VectorizationMicroBenchmark::square@18 (line 3)

  0x000000010ae6be59: cmp    %r11d,%r8d
  0x000000010ae6be5c: jl     0x000000010ae6be44  ;*synchronization entry
                                                ; - VectorizationMicroBenchmark::square@-1 (line 3)

  0x000000010ae6be5e: vzeroupper 
  0x000000010ae6be61: add    $0x10,%rsp
  0x000000010ae6be65: pop    %rbp
  0x000000010ae6be66: test   %eax,-0x2207e6c(%rip)        # 0x0000000108c64000
                                                ;   {poll_return}
  0x000000010ae6be6c: retq   
  0x000000010ae6be6d: mov    %rsi,%rbp
  0x000000010ae6be70: mov    $0xffffff86,%esi
  0x000000010ae6be75: data16 xchg %ax,%ax
  0x000000010ae6be78: vzeroupper 
  0x000000010ae6be7b: callq  0x000000010abef6a0  ; OopMap{rbp=Oop off=224}
                                                ;*aload_0
                                                ; - VectorizationMicroBenchmark::square@8 (line 4)
                                                ;   {runtime_call}
  0x000000010ae6be80: callq  0x000000010a078180  ;*aload_0
                                                ; - VectorizationMicroBenchmark::square@8 (line 4)
                                                ;   {runtime_call}
  0x000000010ae6be85: mov    $0xfffffff6,%esi
  0x000000010ae6be8a: xchg   %ax,%ax
  0x000000010ae6be8c: vzeroupper 
  0x000000010ae6be8f: callq  0x000000010abef6a0  ; OopMap{off=244}
                                                ;*arraylength
                                                ; - VectorizationMicroBenchmark::square@4 (line 3)
                                                ;   {runtime_call}
  0x000000010ae6be94: callq  0x000000010a078180  ;*aload_0
                                                ; - VectorizationMicroBenchmark::square@8 (line 4)
                                                ;   {runtime_call}
  0x000000010ae6be99: hlt    
  0x000000010ae6be9a: hlt    
  0x000000010ae6be9b: hlt    
  0x000000010ae6be9c: hlt    
  0x000000010ae6be9d: hlt    
  0x000000010ae6be9e: hlt    
  0x000000010ae6be9f: hlt    
[Exception Handler]
[Stub Code]
  0x000000010ae6bea0: jmpq   0x000000010ac197a0  ;   {no_reloc}
[Deopt Handler Code]
  0x000000010ae6bea5: callq  0x000000010ae6beaa
  0x000000010ae6beaa: subq   $0x5,(%rsp)
  0x000000010ae6beaf: jmpq   0x000000010abf1500  ;   {runtime_call}
  0x000000010ae6beb4: hlt    
  0x000000010ae6beb5: hlt    
  0x000000010ae6beb6: hlt    
  0x000000010ae6beb7: hlt    
OopMapSet contains 2 OopMaps

#0 
OopMap{rbp=Oop off=224}
#1 
OopMap{off=244}
Compiled method (c2)     173   37 %     4       VectorizationMicroBenchmark::square @ 2 (25 bytes)
 total in heap  [0x000000010ae70250,0x000000010ae70710] = 1216
 relocation     [0x000000010ae70378,0x000000010ae70398] = 32
 main code      [0x000000010ae703a0,0x000000010ae70520] = 384
 stub code      [0x000000010ae70520,0x000000010ae70538] = 24
 oops           [0x000000010ae70538,0x000000010ae70540] = 8
 metadata       [0x000000010ae70540,0x000000010ae70550] = 16
 scopes data    [0x000000010ae70550,0x000000010ae705a8] = 88
 scopes pcs     [0x000000010ae705a8,0x000000010ae706f8] = 336
 dependencies   [0x000000010ae706f8,0x000000010ae70700] = 8
 nul chk table  [0x000000010ae70700,0x000000010ae70710] = 16
Decoding compiled method 0x000000010ae70250:
Code:
[Entry Point]
[Verified Entry Point]
[Constants]
  # {method} {0x0000000122d02aa8} 'square' '([F)V' in 'VectorizationMicroBenchmark'
  0x000000010ae703a0: callq  0x000000010a078180  ;   {runtime_call}
  0x000000010ae703a5: data16 data16 nopw 0x0(%rax,%rax,1)
  0x000000010ae703b0: mov    %eax,-0x14000(%rsp)
  0x000000010ae703b7: push   %rbp
  0x000000010ae703b8: sub    $0x30,%rsp
  0x000000010ae703bc: mov    (%rsi),%ebp
  0x000000010ae703be: mov    0x8(%rsi),%rbx
  0x000000010ae703c2: mov    %rsi,%rdi
  0x000000010ae703c5: vzeroupper 
  0x000000010ae703c8: movabs $0x10a0d751e,%r10
  0x000000010ae703d2: callq  *%r10
  0x000000010ae703d5: mov    0x8(%rbx),%r11d    ; implicit exception: dispatches to 0x000000010ae704f1
  0x000000010ae703d9: cmp    $0xf800007d,%r11d  ;   {metadata({type array float})}
  0x000000010ae703e0: jne    0x000000010ae704d9  ;*iload_1
                                                ; - VectorizationMicroBenchmark::square@2 (line 3)

  0x000000010ae703e6: mov    0xc(%rbx),%r11d    ;*arraylength
                                                ; - VectorizationMicroBenchmark::square@4 (line 3)

  0x000000010ae703ea: cmp    %r11d,%ebp
  0x000000010ae703ed: jge    0x000000010ae704ac  ;*if_icmpge
                                                ; - VectorizationMicroBenchmark::square@5 (line 3)

  0x000000010ae703f3: mov    %ebx,%r8d
  0x000000010ae703f6: mov    %ebp,%r10d
  0x000000010ae703f9: inc    %r10d
  0x000000010ae703fc: shr    $0x2,%r8d
  0x000000010ae70400: and    $0x7,%r8d
  0x000000010ae70404: xor    %r9d,%r9d
  0x000000010ae70407: cmp    %r9d,%r10d
  0x000000010ae7040a: cmovl  %r9d,%r10d
  0x000000010ae7040e: cmp    %r11d,%r10d
  0x000000010ae70411: cmovg  %r11d,%r10d
  0x000000010ae70415: add    %r10d,%r8d
  0x000000010ae70418: mov    $0x4,%ecx
  0x000000010ae7041d: sub    %r8d,%ecx
  0x000000010ae70420: and    $0x7,%ecx
  0x000000010ae70423: add    %r10d,%ecx
  0x000000010ae70426: cmp    %r11d,%ecx
  0x000000010ae70429: cmovg  %r11d,%ecx
  0x000000010ae7042d: cmp    %r11d,%ebp
  0x000000010ae70430: jae    0x000000010ae704bb
  0x000000010ae70436: vmovss 0x10(%rbx,%rbp,4),%xmm1  ;*faload
                                                ; - VectorizationMicroBenchmark::square@12 (line 4)

  0x000000010ae7043c: vmulss %xmm1,%xmm1,%xmm0
  0x000000010ae70440: vmovss %xmm0,0x10(%rbx,%rbp,4)  ;*fastore
                                                ; - VectorizationMicroBenchmark::square@17 (line 4)

  0x000000010ae70446: inc    %ebp               ;*iinc
                                                ; - VectorizationMicroBenchmark::square@18 (line 3)

  0x000000010ae70448: cmp    %ecx,%ebp
  0x000000010ae7044a: jl     0x000000010ae7042d  ;*if_icmpge
                                                ; - VectorizationMicroBenchmark::square@5 (line 3)

  0x000000010ae7044c: mov    %r11d,%r8d
  0x000000010ae7044f: add    $0xfffffff9,%r8d
  0x000000010ae70453: mov    $0x80000000,%r9d
  0x000000010ae70459: cmp    %r8d,%r11d
  0x000000010ae7045c: cmovl  %r9d,%r8d
  0x000000010ae70460: cmp    %r8d,%ebp
  0x000000010ae70463: jge    0x000000010ae70488
  0x000000010ae70465: data16 data16 nopw 0x0(%rax,%rax,1)
  0x000000010ae70470: vmovdqu 0x10(%rbx,%rbp,4),%ymm0  ;*faload
                                                ; - VectorizationMicroBenchmark::square@12 (line 4)

  0x000000010ae70476: vmulps %ymm0,%ymm0,%ymm0
  0x000000010ae7047a: vmovdqu %ymm0,0x10(%rbx,%rbp,4)  ;*fastore
                                                ; - VectorizationMicroBenchmark::square@17 (line 4)

  0x000000010ae70480: add    $0x8,%ebp          ;*iinc
                                                ; - VectorizationMicroBenchmark::square@18 (line 3)

  0x000000010ae70483: cmp    %r8d,%ebp
  0x000000010ae70486: jl     0x000000010ae70470  ;*if_icmpge
                                                ; - VectorizationMicroBenchmark::square@5 (line 3)

  0x000000010ae70488: cmp    %r11d,%ebp
  0x000000010ae7048b: jge    0x000000010ae704ac
  0x000000010ae7048d: data16 xchg %ax,%ax
  0x000000010ae70490: cmp    %r11d,%ebp
  0x000000010ae70493: jae    0x000000010ae704bb
  0x000000010ae70495: vmovss 0x10(%rbx,%rbp,4),%xmm0  ;*faload
                                                ; - VectorizationMicroBenchmark::square@12 (line 4)

  0x000000010ae7049b: vmulss %xmm0,%xmm0,%xmm1
  0x000000010ae7049f: vmovss %xmm1,0x10(%rbx,%rbp,4)  ;*fastore
                                                ; - VectorizationMicroBenchmark::square@17 (line 4)

  0x000000010ae704a5: inc    %ebp               ;*iinc
                                                ; - VectorizationMicroBenchmark::square@18 (line 3)

  0x000000010ae704a7: cmp    %r11d,%ebp
  0x000000010ae704aa: jl     0x000000010ae70490  ;*iload_1
                                                ; - VectorizationMicroBenchmark::square@2 (line 3)

  0x000000010ae704ac: vzeroupper 
  0x000000010ae704af: add    $0x30,%rsp
  0x000000010ae704b3: pop    %rbp
  0x000000010ae704b4: test   %eax,-0x220c4ba(%rip)        # 0x0000000108c64000
                                                ;   {poll_return}
  0x000000010ae704ba: retq   
  0x000000010ae704bb: mov    $0xffffffe4,%esi
  0x000000010ae704c0: mov    %rbx,0x8(%rsp)
  0x000000010ae704c5: mov    %rbx,0x18(%rsp)
  0x000000010ae704ca: xchg   %ax,%ax
  0x000000010ae704cc: vzeroupper 
  0x000000010ae704cf: callq  0x000000010abef6a0  ; OopMap{[8]=Oop [24]=Oop off=308}
                                                ;*faload
                                                ; - VectorizationMicroBenchmark::square@12 (line 4)
                                                ;   {runtime_call}
  0x000000010ae704d4: callq  0x000000010a078180  ;   {runtime_call}
  0x000000010ae704d9: mov    $0xffffff9d,%esi
  0x000000010ae704de: mov    %rbx,(%rsp)
  0x000000010ae704e2: xchg   %ax,%ax
  0x000000010ae704e4: vzeroupper 
  0x000000010ae704e7: callq  0x000000010abef6a0  ; OopMap{[0]=Oop off=332}
                                                ;*iload_1
                                                ; - VectorizationMicroBenchmark::square@2 (line 3)
                                                ;   {runtime_call}
  0x000000010ae704ec: callq  0x000000010a078180  ;   {runtime_call}
  0x000000010ae704f1: mov    $0xffffff86,%esi
  0x000000010ae704f6: xchg   %ax,%ax
  0x000000010ae704f8: vzeroupper 
  0x000000010ae704fb: callq  0x000000010abef6a0  ; OopMap{off=352}
                                                ;*iload_1
                                                ; - VectorizationMicroBenchmark::square@2 (line 3)
                                                ;   {runtime_call}
  0x000000010ae70500: callq  0x000000010a078180  ;*iload_1
                                                ; - VectorizationMicroBenchmark::square@2 (line 3)
                                                ;   {runtime_call}
  0x000000010ae70505: hlt    
  0x000000010ae70506: hlt    
  0x000000010ae70507: hlt    
  0x000000010ae70508: hlt    
  0x000000010ae70509: hlt    
  0x000000010ae7050a: hlt    
  0x000000010ae7050b: hlt    
  0x000000010ae7050c: hlt    
  0x000000010ae7050d: hlt    
  0x000000010ae7050e: hlt    
  0x000000010ae7050f: hlt    
  0x000000010ae70510: hlt    
  0x000000010ae70511: hlt    
  0x000000010ae70512: hlt    
  0x000000010ae70513: hlt    
  0x000000010ae70514: hlt    
  0x000000010ae70515: hlt    
  0x000000010ae70516: hlt    
  0x000000010ae70517: hlt    
  0x000000010ae70518: hlt    
  0x000000010ae70519: hlt    
  0x000000010ae7051a: hlt    
  0x000000010ae7051b: hlt    
  0x000000010ae7051c: hlt    
  0x000000010ae7051d: hlt    
  0x000000010ae7051e: hlt    
  0x000000010ae7051f: hlt    
[Exception Handler]
[Stub Code]
  0x000000010ae70520: jmpq   0x000000010ac197a0  ;   {no_reloc}
[Deopt Handler Code]
  0x000000010ae70525: callq  0x000000010ae7052a
  0x000000010ae7052a: subq   $0x5,(%rsp)
  0x000000010ae7052f: jmpq   0x000000010abf1500  ;   {runtime_call}
  0x000000010ae70534: hlt    
  0x000000010ae70535: hlt    
  0x000000010ae70536: hlt    
  0x000000010ae70537: hlt    
OopMapSet contains 3 OopMaps

#0 
OopMap{[8]=Oop [24]=Oop off=308}
#1 
OopMap{[0]=Oop off=332}
#2 
OopMap{off=352}
```



## link

- demo: http://daniel-strecker.com/blog/2020-01-14_auto_vectorization_in_java/#Output%20Interpretation
- hsdis: https://github.com/liuzhengyang/hsdis
